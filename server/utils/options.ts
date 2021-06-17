import { SendOptions } from "oak/mod.ts";

export const staticFilesSendOptionsBase: SendOptions = {
  root: Deno.cwd() + "/static",
};
