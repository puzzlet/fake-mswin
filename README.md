fake-mswin project provides Windows look-and-feel on your web browser.

You can see online demo [here][gh-pages].

# Build

You need [sass][] to build css files.

In working directory, type `make` to generate css/js files.
`build/` is the default output dir; you may change it by `OUTDIR=/path make`.

To make example html pages, prepare [jinja2][] and type `make examples`.

# License

This software is distributed under MIT License.
See LICENSE file for details.

[sass]: http://sass-lang.com/
[jinja2]: http://jinja.pocoo.org/
[gh-pages]: http://puzzlet.github.io/fake-mswin/win98/en_US/demo.html
