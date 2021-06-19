import { Context, Router, send } from "oak/mod.ts";
import { staticFilesSendOptionsBase } from "@/server/utils/options.ts";
import { pushResources } from "@/server/utils/headers.ts";

import App from "@/app/App.tsx";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

// Routes
export const router: Router = new Router();

router.get("/", async (ctx: Context) => {
  const { pathname } = ctx.request.url;

  // Server Push
  pushResources(ctx.response, [{
    path: "/styles.css",
    rel: "preload",
    as: "style",
  }, {
    path: "/widgets/hello-world.js",
    rel: "modulepreload",
    as: "script",
  }]);

  await send(ctx, `${pathname}index.html`, staticFilesSendOptionsBase);
});

// TODO: Investigate how to better bundle the complete app for Client-Side
const { files } = await Deno.emit("./client/bundle.tsx", {
  importMapPath: "./import_map.json",
  check: false,
  bundle: "module",
  compilerOptions: {
    lib: ["dom", "dom.iterable", "esnext"],
  },
});

router.get("/react-bundle.js", (ctx: Context) => {
  ctx.response.headers.set("Content-Type", "application/javascript");
  ctx.response.body = files["deno:///bundle.js"];
});

router.all(
  "/react(.*)",
  (ctx: Context) => {
    const { pathname } = ctx.request.url;

    const routerContext = {};

    // Server Push
    // This should be done at Cloudfront Lambda Edge Level
    pushResources(ctx.response, [{
      path: "/react-bundle.js",
      rel: "preload",
      as: "script",
    }]);

    // TODO: Most likely to abstract away into a Layout Component or something.
    const htmlTemplate =
      `<!doctype html><html lang="en"><head></head><body><div id="root">${
        renderToString(
          <StaticRouter location={pathname} context={routerContext}>
            <App />
          </StaticRouter>,
        )
      }</div><script src="/react-bundle.js" defer async>
    </script></body></html>`;

    // TODO: Send data from server
    console.log("🦊", "routerContext", routerContext);
    ctx.response.body = htmlTemplate;
  },
);
