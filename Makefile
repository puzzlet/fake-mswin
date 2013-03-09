SKINS = win98 winxp-green winxp-classic
SOURCE_SCSS = $(patsubst %,src/css/%.scss,$(SKINS))
TARGET_CSS = $(patsubst %,gh-pages/%.css,$(SKINS))
LOCALES = en_US ko_KR
SASS_ARGS = --style compressed

all: html po/messages.pot gh-pages/*.js gh-pages/*.jpg gh-pages/*.png gh-pages/images/* gh-pages/vendor/* $(TARGET_CSS)

html: src/*.html po/*.mo gh-pages/.git
	$(foreach skin,$(SKINS), \
		$(foreach locale,$(LOCALES), \
			python build.py $(skin) $(locale) ; \
		) \
	)

gh-pages/*.js: src/js/*.js gh-pages/.git
	cp src/js/*.js gh-pages/

gh-pages/*.jpg gh-pages/*.png: src/css/*.jpg src/css/*.png gh-pages/.git
	cp src/css/*.jpg gh-pages/
	cp src/css/*.png gh-pages/

gh-pages/images/*: src/css/images/* gh-pages/.git
	mkdir -p gh-pages/images/
	cp -rf src/css/images/* gh-pages/images/

gh-pages/vendor/*: src/vendor/* gh-pages/.git
	mkdir -p gh-pages/vendor/
	cp -rf src/vendor/* gh-pages/vendor/

$(TARGET_CSS): src/css/*.scss gh-pages/.git
	$(foreach skin,$(SKINS), \
		sass src/css/$(skin).scss gh-pages/$(skin).css $(SASS_ARGS) ; \
	)

gh-pages/.git:
	git clone -b gh-pages git@github.com:puzzlet/fake-winxp.git gh-pages

po/messages.pot: src/*.html
	mkdir -p po/
	pybabel extract -F babel.conf -o po/messages.pot .

po/*.mo: po/*.po
	$(foreach locale,$(LOCALES), \
		msgfmt -o po/$(locale).mo po/$(locale).po ; \
	)

clean:
	rm -rf gh-pages/*.html gh-pages/*.jpg gh-pages/*.png gh-pages/images/* $(TARGET_CSS)

.PHONY: all clean html
