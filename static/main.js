(() => {
  window.setTimeout(async () => {
    await import("./widgets/hello-world.js");
  }, 1000);
})();
