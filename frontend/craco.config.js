// craco.config.js

// MUST come first — intercept require() before CRA's webpack.config.js loads.
// fork-ts-checker-webpack-plugin has nested ajv-keywords@3.x which crashes when
// our ajv@8 override is active (its _formatLimit.js calls formats.date, undefined in v8).
// This project is pure JavaScript (no TypeScript), so the plugin is not needed at all.
const Module = require('module');
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'fork-ts-checker-webpack-plugin') {
    // Return a harmless no-op class so CRA can instantiate it without crashing.
    // The craco configure() below also filters it from the plugins array.
    return class ForkTsCheckerWebpackPlugin { apply() {} };
  }
  return originalLoad.apply(this, arguments);
};

const path = require("path");
require("dotenv").config();

// Environment variable overrides
const config = {
  enableHealthCheck: process.env.ENABLE_HEALTH_CHECK === "true",
};

// Conditionally load health check modules only if enabled
let WebpackHealthPlugin;
let setupHealthEndpoints;
let healthPluginInstance;

if (config.enableHealthCheck) {
  WebpackHealthPlugin = require("./plugins/health-check/webpack-health-plugin");
  setupHealthEndpoints = require("./plugins/health-check/health-endpoints");
  healthPluginInstance = new WebpackHealthPlugin();
}

let webpackConfig = {
  eslint: {
    configure: {
      extends: ["plugin:react-hooks/recommended"],
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {

      // Belt-and-suspenders: also remove the (now-stubbed) plugin from the array
      // in case CRA still instantiates it before our Module._load hook fires.
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
      );

      // Add ignored patterns to reduce watched directories
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/build/*