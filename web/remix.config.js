/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: "./src",
  devServerBroadcastDelay: 1000,
  server: "./server.js",
  serverBuildTarget: "cloudflare-pages",
}
