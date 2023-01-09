const chokidar = require('chokidar');
const config = require('./config');
const fs = require('fs');
const path = require('path');
const sources = [];
const fm = require('front-matter');

config.build.templates.map((template) => {
    return sources.push(template.source);
})

const watcher = chokidar.watch(sources, {
    awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 100
    },
});

// Change JSON's
watcher.on('change', (_path) => {
    fs.readFile(_path, 'utf8', (err, data) => {
        if (err) throw err;

        const content = fm(data).attributes;
        const distPath = config.build.templates.find((template) => template.source === path.dirname(_path)).destination.path;
        const filename = path.join(distPath, `${path.basename(_path, '.html')}.json`); 

        fs.writeFile(filename, JSON.stringify(content), (err) => {
            if (err) throw err;
        });
    })
})

// Remove JSON's and HTML's
watcher.on('unlink', (_path) => {
    const distPath = config.build.templates.find((template) => template.source === path.dirname(_path)).destination.path;

    const htmlFilename = path.join(distPath, `${path.basename(_path)}`); 
    const jsonFilename = path.join(distPath, `${path.basename(_path, '.html')}.json`); 

    fs.unlink(htmlFilename, (err) => {
        if (err) throw err;
    });

    fs.unlink(jsonFilename, (err) => {
        if (err) throw err;
    });
})


