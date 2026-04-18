// ─── APP ENTRY POINT ─────────────────────────────────────────────────────────
// Bootstraps the MVVM architecture: Model → ViewModel → View

document.addEventListener('DOMContentLoaded', () => {
  const vm   = new AppViewModel(AppData);   // ViewModel receives Model
  const view = new AppView(vm);             // View receives ViewModel
  view.render();                            // Mount everything to #app
});
