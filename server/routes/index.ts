import { Context, Router, send } from "oak/mod.ts";
import { staticFilesSendOptionsBase } from "@/server/utils/options.ts";
import { pushResources } from "@/server/utils/headers.ts";

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
