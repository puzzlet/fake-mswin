OUTDIR?=build
SASS_ARGS ?= --style compressed
SKINS = win98 winxp-green winxp-classic
SOURCE_SCSS = $(patsubst %,src/css/%.scss,$(SKINS))
TARGET_CSS = $(patsubst %,$(OUTDIR)/%.css,$(SKINS))

all: css js

examples: all assets html

css: $(TARGET_CSS) $(OUTDIR)/images/*

js: $(OUTDIR)/*.js

assets: $(OUTDIR)/*.jpg $(OUTDIR)/*.png $(OUTDIR)/images/* vendor

html: src/*.html
	$(foreach skin,$(SKINS), \
		python build.py $(skin) $(OUTDIR) ; \
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

vendor: $(OUTDIR)/vendor/*
$(OUTDIR)/vendor/*: lib/*
	mkdir -p $(OUTDIR)/vendor/
	cp -rf lib/* $(OUTDIR)/vendor/

$(TARGET_CSS): src/css/*.scss
	mkdir -p $(OUTDIR)
	$(foreach skin,$(SKINS), \
		sass src/css/$(skin).scss $(OUTDIR)/$(skin).css $(SASS_ARGS) ; \
	)

clean:
	rm -r $(OUTDIR)

.PHONY: all clean html
