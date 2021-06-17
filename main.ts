import { app } from "./server/app.ts";

const HOSTNAME: string = Deno.env.get("HOSTNAME") ?? "localhost.local";
const PORT: number = Number.parseInt(Deno.env.get("PORT") ?? "8080", 10);

app.listen({
  hostname: HOSTNAME,
  port: PORT,
  secure: true,
  certFile: "./certs/localhost.crt",
  keyFile: "./certs/localhost.key",
  alpnProtocols: ["h2", "http/1.1"],
});
