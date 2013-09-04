# Howdy

Howdy makes it easy to generate presentations from a Markdown source.

## Install

```bash
$ npm install -g howdy
```

## Usage

Create a 'slides.md' file, with slides separated by '---' (`<hr>`s when rendered), and start howdy:

```bash
$ echo '# Slide 1 \n --- \n # Slide 2' > slides.md
$ howdy
$ open http://localhost:9999
```
