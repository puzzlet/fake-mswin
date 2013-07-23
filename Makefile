OUTDIR?=gh-pages
SASS_ARGS ?= --style compressed
SKINS = win98 winxp-green winxp-classic
SOURCE_SCSS = $(patsubst %,src/css/%.scss,$(SKINS))
TARGET_CSS = $(patsubst %,$(OUTDIR)/%.css,$(SKINS))
LOCALES = en_US ko_KR

all: css js

examples: all assets po/messages.pot html

css: $(TARGET_CSS)

js: $(OUTDIR)/*.js

assets: $(OUTDIR)/*.jpg $(OUTDIR)/*.png $(OUTDIR)/images/* $(OUTDIR)/vendor/*

html: src/*.html po/*.mo
	$(foreach skin,$(SKINS), \
		$(foreach locale,$(LOCALES), \
			python build.py $(skin) $(locale) $(OUTDIR); \
		) \
	)

$(OUTDIR)/*.js: src/js/*.js
	mkdir -p $(OUTDIR)
	cp src/js/*.js $(OUTDIR)/

$(OUTDIR)/*.jpg $(OUTDIR)/*.png: src/css/*.jpg src/css/*.png
	cp src/css/*.jpg $(OUTDIR)/
	cp src/css/*.png $(OUTDIR)/

$(OUTDIR)/images/*: src/css/images/*
	mkdir -p $(OUTDIR)/images/
	cp -rf src/css/images/* $(OUTDIR)/images/

$(OUTDIR)/vendor/*: src/vendor/*
	mkdir -p $(OUTDIR)/vendor/
	cp -rf src/vendor/* $(OUTDIR)/vendor/

$(TARGET_CSS): src/css/*.scss
	mkdir -p $(OUTDIR)
	$(foreach skin,$(SKINS), \
		sass src/css/$(skin).scss $(OUTDIR)/$(skin).css $(SASS_ARGS) ; \
	)

po/messages.pot: src/*.html
	mkdir -p po/
	pybabel extract -F babel.conf -o po/messages.pot . || (rm -f po/messages.pot && exit 2)

po/*.mo: po/*.po
	$(foreach locale,$(LOCALES), \
		msgfmt -o po/$(locale).mo po/$(locale).po ; \
	)

clean:
	rm -rf $(OUTDIR)/*.html $(OUTDIR)/*.jpg $(OUTDIR)/*.png $(OUTDIR)/images/* $(TARGET_CSS) po/*.mo po/messages.pot

.PHONY: all clean html
