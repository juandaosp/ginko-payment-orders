export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("../mocks/browser");

    await worker.start({
      onUnhandledRequest: "bypass",
    });

    console.log("🚀 MSW Mock Service Worker iniciado y listo para interceptar");
  }
});
