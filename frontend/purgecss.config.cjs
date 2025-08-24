// purgecss.config.cjs
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx,html}',
    './public/**/*.html'
  ],
  css: [
    './src/styles/globals.css'   // <-- note the ./ at the start
  ],
  safelist: {
    standard: ['btn', 'modal', 'toast'],
    deep: [
      /^is-/, /^has-/, /^js--/,
      /^site-nav/, /^menu__/,
      /^mb-article/, /^PortfolioPage/,
      /^theme-/, /^modal/, /^toast/,
      /^accordion/, /^tabs/, /^lightbox/,
      /^post__/, /^btn/, /^heading/, /^body-/
    ]
  },
  output: 'build'
};
