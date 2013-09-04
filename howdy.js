#!/usr/bin/env node

var ejs        = require('ejs'),
    fs         = require('fs'),
    marked     = require('marked'),
    path       = require('path'),
    pygmentize = require('pygmentize-bundled'),
    rimraf     = require('rimraf');

if (fs.existsSync('.howdy')) {
  console.log('Removing ".howdy"...');
  rimraf.sync('.howdy');
}

console.log('Creating ".howdy"...');
fs.mkdirSync('.howdy');

console.log('Copying JavaScript...');
fs.mkdirSync('.howdy/javascripts');
copyDir('javascripts');

console.log('Copying Styles...');
fs.mkdirSync('.howdy/stylesheets');
copyDir('stylesheets');

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

marked(fs.readFileSync('slides.md').toString(), {}, function (err, content) {
  var opts     = {},
      template = fs.readFileSync(path.join(__dirname, 'template.ejs')).toString(),
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

  fs.writeFileSync('.howdy/index.html', ejs.render(template, {
    slides: content,
    title: opts.title || 'Howdy'
  }));

  startServer();
});

process.on('SIGINT', function () {
  console.log('Removing ".howdy"...');
  rimraf.sync('.howdy');
  console.log('Exiting.');
  process.exit(0);
});

function startServer () {
  var express = require('express'),
      path    = require('path');

  var app = express();

  app.set('port', 9999);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static('.howdy'));

  app.listen(app.get('port'));
  console.log('Howdy listening on port ' + app.get('port'));
}

function copyDir (dir) {
  var fileDir = path.join(__dirname, 'public/' + dir),
      files = fs.readdirSync(fileDir);

  files.forEach(function (file) {
    if (!fs.existsSync(file)) {
      var contents = fs.readFileSync(path.join(fileDir, file)).toString();
      fs.writeFileSync('.howdy/' + dir + '/' + file, contents);
    }
  });
}