/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: "./src",
  devServerBroadcastDelay: 1000,
  server: "./build/server/index.js",
  serverBuildTarget: "cloudflare-pages",
}
