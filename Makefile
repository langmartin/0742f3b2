cadence.js: main.js parser.js
	perl -pe '`pwd`; s|//## (.*?) ##//|`cat "$$1"`|e' < main.js > $@.new
	mv $@.new $@
