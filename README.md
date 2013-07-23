# Build

You need [sass][] and [CoffeeScript][] to build css/js files.

In working directory, type `make` to generate css/js files.
`build/` is the default output dir; you may change it by `OUTDIR=/path make`.

To make example html pages, prepare [jinja2][] and type `make examples`.

You can see online demo [here][gh-pages].

[sass]: http://sass-lang.com/
[jinja2]: http://jinja.pocoo.org/
[gh-pages]: http://puzzlet.github.io/fake-mswin/win98/en_US/demo.html
[CoffeeScript]: http://coffeescript.org/
