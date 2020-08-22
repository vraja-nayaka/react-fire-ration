module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    "@babel/preset-flow",
    "@babel/preset-react",
    '@babel/preset-typescript',
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
  ],
};