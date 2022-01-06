var spritezero = require('@mapbox/spritezero');
var fs = require('fs');
var glob = require('glob');
var path = require('path');

const GITHUB_WORKSPACE = process.argv[2];

const svgsPath = path.resolve(GITHUB_WORKSPACE, 'icons');
const publicPath = GITHUB_WORKSPACE;

[1, 2].forEach(function(pxRatio) {
    var svgs = glob.sync(path.join(svgsPath, `*.svg`))
        .map(function(f) {
            return {
                svg: fs.readFileSync(f),
                id: path.basename(f).replace('.svg', '')
            };
        });

    var file = ''
    if (pxRatio > 1) {
        file = `@${pxRatio}x`;
    }

    var pngPath = path.join(publicPath, `basic${file}.png`);
    var jsonPath = path.join(publicPath, `basic${file}.json`);

    // Pass `true` in the layout parameter to generate a data layout
    // suitable for exporting to a JSON sprite manifest file.
    spritezero.generateLayout({ imgs: svgs, pixelRatio: pxRatio, format: true }, function(err, dataLayout) {
        if (err) return;
        fs.writeFileSync(jsonPath, JSON.stringify(dataLayout));
    });

    // Pass `false` in the layout parameter to generate an image layout
    // suitable for exporting to a PNG sprite image file.
    spritezero.generateLayout({ imgs: svgs, pixelRatio: pxRatio, format: false }, function(err, imageLayout) {
        spritezero.generateImage(imageLayout, function(err, image) {
            if (err) return;
            fs.writeFileSync(pngPath, image);
        });
    });
});