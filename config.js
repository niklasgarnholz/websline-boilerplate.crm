/*
|-------------------------------------------------------------------------------
| Development config                      https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| The exported object contains the default Maizzle settings for development.
| This is used when you run `maizzle build` or `maizzle serve` and it has
| the fastest build time, since most transformations are disabled.
|
*/

module.exports = {
  locals: {
    company: {
      name: 'Spacely Space Sprockets, Inc.'
    }
  },
  events: {
    async beforeRender(html, config) {

      return html
    }
  },
  build: {
    layouts: {
      root: 'src/layouts'
    }, 
    templates: [
      {
        source: 'src/templates/design',
        destination: {
          path: 'dist/design'
        },
      },
      {
        source: 'src/templates/division',
        destination: {
          path: 'dist/division'
        },
      }
    ]
  },
}
