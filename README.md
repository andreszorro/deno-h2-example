# Deno HTTP2 Example

### Milestones

- [x] Starter Deno Setup
  - [x] TRex Dependencies
  - [x] Velociraptor Scripts Setup
- [ ] Test setup
  - [x] Coverage Report Setup (lcov)
  - [ ] Test Front-End React Components
- [ ] Create SSR React Front-End
  - [x] Render an SSR Component with React
  - [x] Solution for React Router on Server-Side
  - [ ] Hydrate React App Server Props on Client-Side
  - [ ] Abstract away Layout React Component
  - [x] "Compile to Front-End" Setup
  - [ ] Add CSS-in-JS solution
  - [ ] Add env variables
- [ ] Docker Multi-Stage Image Build
  - [ ] Build Front-End file for production
  - [ ] Compile server binary
- [ ] Deploy Image to AWS Lambda Serverless
  - [ ] Use some kind of Cloudfront-S3-Lambda-API Gateway setup

---

## Instructions

1. Install [Deno](https://deno.land/#installation)
2. Install [Velociraptor](https://velociraptor.run/docs/installation/) globally
3. Create a localhost certificate using
   [mkcert](https://formulae.brew.sh/formula/mkcert)
   1. Run `mkcert localhost.local localhost 127.0.0.1 ::1`
   2. Move generated files to `certs/` folder and rename them to `localhost.key`
      and `localhost.crt` accordingly.
4. Run `vr start`

## Install Dependencies

Deno doesn't do anything special about dependencies. But sometimes it's better
just to add the entries to the import map automatically, to avoid typos. That's
where TRex shines.

1. Install [TRex](https://deno.land/x/trex@v1.7.0) globally.
2. Run `trex install --map [dependency-name]`
