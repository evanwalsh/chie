BIN_DIR=./node_modules/.bin

all:
	$(BIN_DIR)/webpack --config webpack.config.js

install: all
	npm link

watch:
	$(BIN_DIR)/webpack --config webpack.config.js -w

flow:
	$(BIN_DIR)/flow check src

style:
	$(BIN_DIR)/standard src/** test/** webpack.config.js | $(BIN_DIR)/snazzy

lint: flow style

test:
	$(BIN_DIR)/tape -r babel-register -r ./test/helper.js test/**_test.js | $(BIN_DIR)/faucet

.PHONY: watch flow style lint test