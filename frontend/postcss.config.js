// postcss.config.js
module.exports = {
  plugins: {
    'postcss-discard-duplicates': {},
    'postcss-merge-rules': {},
    autoprefixer: {},
    cssnano: { preset: 'default' }
  }
};
