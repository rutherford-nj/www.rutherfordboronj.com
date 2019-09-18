### BEGIN Variables ###
FIREBASE_DEPLOY = ./node_modules/.bin/firebase deploy --non-interactive --token=$(RBH_FIREBASE_TOKEN)


JEKYLL_BUILD = bundle exec jekyll build
### END Variables ###


### BEGIN Third Party Packages ###
package-jquery: npm-packages
	mkdir -p third_party/jquery
	cp ./node_modules/jquery/dist/jquery.min.js third_party/jquery/jquery.min.js

package-lscache: npm-packages
	cp ./node_modules/lscache/lscache.min.js static/js/lscache.min.js

package-lunr: npm-packages
	mkdir -p third_party/lunr
	cp ./node_modules/lunr/lunr.js third_party/lunr/lunr.js

package-slick-carousel: npm-packages
	cp -R ./node_modules/slick-carousel/slick third_party/

package-modernizr: npm-packages
	./node_modules/.bin/modernizr --config=modernizr-config.json --dest=static/js/modernizr.js

package-nanogallery2: npm-packages
	cp -R ./node_modules/nanogallery2/dist third_party/nanogallery2

package-firebase-tools: npm-packages
package-serve: npm-packages
package-jekyll: bundle-packages
package-htmlproofer: bundle-packages

third-party-js-packages: \
	package-jquery \
	package-lscache \
	package-lunr \
	package-slick-carousel \
	package-modernizr \
	package-nanogallery2
### END Third Party Packages ###


build-requirements: third-party-js-packages package-jekyll


dev: build-requirements package-serve
	mkdir -p _site & \
	$(JEKYLL_BUILD) --watch & \
	./node_modules/.bin/serve --listen 8080 _site/


prod: build-requirements package-htmlproofer
	$(JEKYLL_BUILD)


deploy: prod package-firebase-tools
	$(PREDEPLOY)
	$(FIREBASE_DEPLOY) --project=$(FIREBASE_PROJECT)



npm-packages:
	npm install


bundle-packages:
	bundle install


clean:
	rm package-lock.json
	rm Gemfile.lock
	rm -rf node_modules
	rm -rf _site
	rm -rf third_party
