
NPM = pnpm
BUILD_DIR = ./docs

default: help

##	make help - display the help
##
# @ - supresses command output
help:
	@grep "^##.*" ./Makefile

##	setup - install packages
##
setup:
	$(NPM) install

## run - attempt run webpack-dev-server
##
run:
	$(NPM) run dev


build-js:
	BUILD_DIR=$(BUILD_DIR) $(NPM) run build

build-favicon:
	cp ./src/favicon.ico $(BUILD_DIR)

build-index:
	cp ./src/index.html $(BUILD_DIR)

build: build-js build-favicon build-index


##	tests - run all tests
##	test NAME=name - run single test, searches thru 'describe' suite
##	To run just one test: mocha ./src/**/*.tests.js --grep FileName
##
tests:
	(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 $(ARGS))

test:
		(export NODE_PATH=./; find ./src -name '*.tests.js' | xargs mocha --timeout 10000 --grep=$(NAME))
