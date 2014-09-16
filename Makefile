.PHONY: clean production watch

# Builds a production version of libarary.
production: node_modules
	@NODE_ENV=production webpack --colors --progress -p

# Builds a production version of libarary.
watch: node_modules
	@NODE_ENV=development webpack --colors --progress --watch --debug

clean:
	@rm -rf node_modules

node_modules:
	@npm install
