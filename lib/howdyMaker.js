#!/usr/bin/env node

var ejs        = require('ejs'),
    fs         = require('fs'),
    marked     = require('marked'),
    path       = require('path'),
    pygmentize = require('pygmentize-bundled'),
    rimraf     = require('rimraf');

module.exports = HowdyMaker;

function HowdyMaker (slidesFile, callback) {
  this.slidesFile = slidesFile;
  this.publicDir  = '.howdy';

  this.createPublicDir();
  this.copyAssetDir('JavaScripts', 'javascripts');
  this.copyAssetDir('stylesheets', 'stylesheets');
  this.convertSlides(callback);
}

HowdyMaker.prototype.createPublicDir = function createPublicDir () {
  if (fs.existsSync(this.publicDir)) {
    console.log('Removing "' + this.publicDir + '"...');
    rimraf.sync(this.publicDir);
  }

  console.log('Creating "' + this.publicDir + '"...');
  fs.mkdirSync(this.publicDir);
};

HowdyMaker.prototype.copyAssetDir = function copyAssetDir (logName, dirName) {
  var fileDir = path.join(__dirname, '../public/' + dirName),
      files   = fs.readdirSync(fileDir),
      _this   = this;

  console.log('Copying ' + logName + '...');
  fs.mkdirSync(this.publicDir + '/' + dirName);

  files.forEach(function (file) {
    if (!fs.existsSync(file)) {
      var contents = fs.readFileSync(path.join(fileDir, file)).toString();
      fs.writeFileSync(_this.publicDir + '/' + dirName + '/' + file, contents);
    }
  });
};

HowdyMaker.prototype.convertSlides = function convertSlides (callback) {
  var _this = this;

  console.log('Converting slides to HTML...');

  marked.setOptions({
    gfm: true,
    highlight: function (code, lang, callback) {
      pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
        if (err) return callback(err);
        callback(null, result.toString());
      });
    },
    linebreaks: true,
    tables: true
  });

  marked(fs.readFileSync(this.slidesFile).toString(), {}, function (err, content) {
    var opts     = {},
        template = fs.readFileSync(path.join(__dirname, '../template.ejs')).toString(),
        slides;

    if (err) throw err;

    if (fs.existsSync('howdy.json')) {
      opts = JSON.parse(fs.readFileSync('howdy.json').toString());
    }

    slides = content.split('<hr>');

    for (var i = 0; i < slides.length; i++) {
      slides[i] = '<li class="slide" id="slide' + (i + 1) + '">' + slides[i] + '</li>';
    }

    content = slides.join('');

    fs.writeFileSync(_this.publicDir + '/index.html', ejs.render(template, {
      slides: content,
      title: opts.title || 'Howdy'
    }));

    callback();
  });
};
