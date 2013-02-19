all: gh-pages/* gh-pages/.git

gh-pages/*: src src/css
	cp src/*.html gh-pages/
	cp src/css/* gh-pages/

gh-pages/.git:
	git clone -b gh-pages git@github.com:puzzlet/fake-winxp.git gh-pages
