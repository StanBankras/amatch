const slug = require('slug');

// Edit slug so it doesn't replace spaces with '-' -- https://www.npmjs.com/package/slugify
slug.defaults.mode ='pretty';
slug.defaults.modes['pretty'] = {
  replacement: ' ',
  symbols: true,
  remove: /[.]/g,
  lower: false,
  charmap: slug.charmap,
  multicharmap: slug.multicharmap
};

module.exports = slug;