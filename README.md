# Deno HTTP2 Example

## Instructions

1. Install [Deno](https://deno.land/#installation)
2. Install [Velociraptor](https://velociraptor.run/docs/installation/) globally
3. Create a localhost certificate using
   [mkcert](https://formulae.brew.sh/formula/mkcert)
   1. Run `mkcert localhost.local localhost 127.0.0.1 ::1`
   2. Move generated files to `certs/` folder and rename them to `localhost.key`
      and `localhost.crt` accordingly.
4. Run `vr start`

---

## Install Dependencies

Deno doesn't do anything special about dependencies. But sometimes it's better
just to add the entries to the import map automatically, to avoid typos. That's
where TRex shines.

1. Install [TRex](https://deno.land/x/trex@v1.7.0) globally.
2. Run `trex install --map [dependency-name]`
