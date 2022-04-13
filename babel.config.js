module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '14.15.0'
        },
        corejs: 3,
        modules: false,
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ]
}
