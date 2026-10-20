export function BuildInfo() {
  return (
    <small class="build-info" title={`Full build: ${__APP_BUILD_FULL__}`}>
      v{__APP_VERSION__} · build {__APP_BUILD__}
    </small>
  );
}
