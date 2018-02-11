app:
	parcel serve app/index.html

appc:
	parcel build src

build: clean compile jsc jsmin cssc cssmin copy clean

compile: tsc jsc cssc

tsc:
	node_modules/typescript/bin/tsc \
		--outDir .cache --module es2015

jsc:
	node_modules/rollup/bin/rollup -c

cssc:
	node_modules/node-sass/bin/node-sass \
		src/style.scss dist/$(PKG_NAME).css

jsmin:
	node_modules/uglify-js/bin/uglifyjs \
		dist/$(PKG_NAME).umd.js -mc --source-map -o \
		dist/$(PKG_NAME).umd.min.js

cssmin:
	node_modules/clean-css-cli/bin/cleancss -o \
		dist/$(PKG_NAME).min.css dist/$(PKG_NAME).css

clean:
	-rm -rf .cache
	-rm -rf dist

copy:
	-cp src/style.scss dist/$(PKG_NAME).scss

test:
	node_modules/karma/bin/karma start \
		--single-run --reporters spec

lint:
	-node_modules/tslint/bin/tslint \
		--format stylish --project tsconfig.json --type-check

.PHONY: app appc build compile tsc jsc cssc jsmin cssmin clean copy test lint
