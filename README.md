# Deno HTTP2 Example

## Instructions

1. Install [Deno](https://deno.land/#installation)
2. Install [Denon](https://deno.land/x/denon@2.4.7#install) globally
3. Create a localhost certificate using
   [mkcert](https://formulae.brew.sh/formula/mkcert)
   1. Run `mkcert localhost.local localhost 127.0.0.1 ::1`
   2. Move generated files to `certs/` folder and rename them to `localhost.key`
      and `localhost.crt` accordingly.
4. Run `denon start`
