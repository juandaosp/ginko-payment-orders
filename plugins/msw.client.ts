export default defineNuxtPlugin(async (nuxtApp) => {
  const { worker } = await import("../mocks/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
  console.log("🚀 MSW funcionando en producción (Modo Demo)");
});
