SKINS = win98 winxp-green winxp-classic
SOURCE_SCSS = $(patsubst %,src/css/%.scss,$(SKINS))
TARGET_CSS = $(patsubst %,gh-pages/%.css,$(SKINS))
SASS_ARGS = --style compressed

all: html gh-pages/*.js gh-pages/*.jpg gh-pages/*.png gh-pages/images/* gh-pages/vendor/* $(TARGET_CSS)

html: src/*.html gh-pages/.git
	python3 build.py win98 en_US
	python3 build.py win98 ko_KR
	python3 build.py winxp-classic en_US
	python3 build.py winxp-classic ko_KR
	python3 build.py winxp-green en_US
	python3 build.py winxp-green ko_KR

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

clean:
	rm -rf gh-pages/*.html gh-pages/*.jpg gh-pages/*.png gh-pages/images/* $(TARGET_CSS)

.PHONY: all clean html
