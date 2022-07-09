/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: "./src",
  devServerBroadcastDelay: 1000,
  server: "./src/server/build/index.js",
  serverBuildTarget: "cloudflare-pages",
}
