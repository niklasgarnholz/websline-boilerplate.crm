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
const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

module.exports = {
  locals: {
    company: {
      name: 'Spacely Space Sprockets, Inc.'
    }
  },
  events: {
    afterBuild(files) {
      files.forEach(file => {
        const filePath = path.parse(file)
        const type = filePath.dir.replace('dist/','')

        fs.readFile(path.join('src/templates', type, filePath.base ), 'utf8', (err, data) => {
          if (err) throw err;

          const content = fm(data).attributes;
          console.log(file);

          fs.writeFile(path.join(filePath.dir, `${filePath.name}.json`), JSON.stringify(content), (err) => {
              if (err) throw err;
            });
        })
      }); 
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




