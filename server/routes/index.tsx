import { Context, Router, send } from "oak/mod.ts";
import { staticFilesSendOptionsBase } from "@/server/utils/options.ts";
import { pushResources } from "@/server/utils/headers.ts";

import App from "@/components/App.tsx";
import React from "react";
import { renderToString } from "react-dom/server";

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

router.get("/react", (ctx: Context) => {
  // Server Push
  pushResources(ctx.response, [{
    path: "https://cdn.esm.sh/v41/react@17.0.2/es2020/react.js",
    rel: "modulepreload",
    as: "script",
  }, {
    path: "https://cdn.esm.sh/v41/react-dom@17.0.2/es2020/react-dom.js",
    rel: "modulepreload",
    as: "script",
  }, {
    path: "https://cdn.esm.sh/v41/object-assign@4.1.1/es2020/object-assign.js",
    rel: "modulepreload",
    as: "script",
  }, {
    path: "https://cdn.esm.sh/v41/scheduler@0.20.2/es2020/scheduler.js",
    rel: "modulepreload",
    as: "script",
  }]);

  // TODO: Most likely to abstract away into a Layout Component or something.
  ctx.response.body = `<html><head></head><body>${
    renderToString(<App />)
  }</body><script type="module" defer>
  import React from "https://esm.sh/react@17.0.2";
  import ReactDOM from "https://esm.sh/react-dom@17.0.2";
  const App = ${App};
  ReactDOM.hydrate(React.createElement(App), document.body);
  </script></html>`;
});
