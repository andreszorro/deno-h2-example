import {
  Application,
  Context,
  isHttpError,
  Router,
  send,
  SendOptions,
  Status,
} from "oak/mod.ts";
import { bgBlue, yellow } from "std/fmt/colors.ts";
import { pushResources } from "./utils/headers.ts";

const HOSTNAME: string = Deno.env.get("HOSTNAME") ?? "localhost.local";
const PORT: number = Number.parseInt(Deno.env.get("PORT") ?? "8080", 10);

const app = new Application();

// Listeners
app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    yellow(
      `Listening on http${secure ? "s" : ""}://${hostname}:${port}`,
    ),
  );
});

app.addEventListener("error", (err) => {
  console.error("General error:", err);
});

// Routes
const router: Router = new Router();
const staticFilesSendOptionsBase: SendOptions = {
  root: Deno.cwd() + "/static",
};

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

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Static files
app.use(async (ctx: Context) => {
  const { method, url: { pathname } } = ctx.request;
  try {
    console.log(`${bgBlue(method)} ${pathname}`);

    await send(ctx, pathname, staticFilesSendOptionsBase);
  } catch (err: unknown) {
    console.error("Path error", (err as Error).toString());
    if (isHttpError(err) && err.status === Status.NotFound) {
      await send(ctx, `/404.html`, staticFilesSendOptionsBase);
    } else {
      throw err;
    }
  }
});

app.listen({
  hostname: HOSTNAME,
  port: PORT,
  secure: true,
  certFile: "./certs/localhost.crt",
  keyFile: "./certs/localhost.key",
  alpnProtocols: ["h2", "http/1.1"],
});
