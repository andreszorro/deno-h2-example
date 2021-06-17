import { Application, Context, isHttpError, send, Status } from "oak/mod.ts";
import { router as indexRouter } from "./routes/index.ts";
import { staticFilesSendOptionsBase } from "./utils/options.ts";
import { bgBlue, yellow } from "std/fmt/colors.ts";

export const app: Application = new Application();

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
app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

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
