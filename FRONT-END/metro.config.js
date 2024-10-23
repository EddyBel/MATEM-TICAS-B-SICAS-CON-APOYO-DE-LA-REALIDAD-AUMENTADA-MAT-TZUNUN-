const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  "fbx",
  "obj",
  "mtl",
  "JPG",
  "vrx",
  "hdr",
  "gltf",
  "glb",
  "bin",
  "arobject",
  "png",
  "lib"
);

module.exports = config;
