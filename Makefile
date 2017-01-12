all:
	./node_modules/.bin/webpack --config webpack.config.js

install: all
	npm link

watch:
	./node_modules/.bin/webpack --config webpack.config.js -w

flow:
	./node_modules/.bin/flow src/**

style:
	./node_modules/.bin/standard-flow src/** webpack.config.js

lint: flow style

.PHONY: watch flow style lint