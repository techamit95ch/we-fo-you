// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// config.transformer.babelTransformerPath = require.resolve('./metro.transformer');
config.transformer.babelTransformerPath=require.resolve('react-native-svg-transformer');
config.resolver.assetExts =config.resolver.assetExts.filter((ext) => ext !== 'svg')
config.resolver.sourceExts =[...config.resolver.sourceExts ,'svg']

config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);


module.exports = config;
