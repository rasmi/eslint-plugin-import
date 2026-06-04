const fs = require('fs');

// Native Windows runs mocha without nyc (its collector crashes there), so
// persist babel-plugin-istanbul's coverage for `nyc report`, skipping test
// files the way the normal nyc lane does.
process.on('exit', function writeCoverage() {
  if (!global.__coverage__) {
    return;
  }
  const data = {};
  Object.keys(global.__coverage__).forEach(function (file) {
    if (file.replace(/\\/g, '/').indexOf('/tests/') === -1) {
      data[file] = global.__coverage__[file];
    }
  });
  if (!fs.existsSync('.nyc_output')) {
    fs.mkdirSync('.nyc_output');
  }
  fs.writeFileSync('.nyc_output/out.json', JSON.stringify(data));
});
