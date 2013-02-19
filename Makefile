SKINS = winxp-green
SOURCE_SCSS = $(patsubst %,src/css/%.scss,$(SKINS))
TARGET_CSS = $(patsubst %,gh-pages/%.css,$(SKINS))

all: gh-pages/*.html gh-pages/*.jpg gh-pages/*.png $(TARGET_CSS)

gh-pages/*.html: src/*.html gh-pages/.git
	cp src/*.html gh-pages/

gh-pages/*.jpg gh-pages/*.png: src/css/*.jpg src/css/*.png gh-pages/.git
	cp src/css/*.jpg gh-pages/
	cp src/css/*.png gh-pages/

$(TARGET_CSS): $(SOURCE_SCSS) gh-pages/.git
	$(foreach skin,$(SKINS), \
		sass src/css/$(skin).scss gh-pages/$(skin).css --style compressed ; \
	)

gh-pages/.git:
	git clone -b gh-pages git@github.com:puzzlet/fake-winxp.git gh-pages
