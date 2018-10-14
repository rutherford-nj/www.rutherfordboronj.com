### BEGIN Variables ###
FIREBASE_DEPLOY = ./node_modules/.bin/firebase deploy --non-interactive --token=$(RBH_FIREBASE_TOKEN)


JEKYLL_BUILD = bundle exec jekyll build


ifeq ($(TRAVIS_BRANCH), www)
	PREDEPLOY=rm ./_site/robots.txt
	PROJECT=rutherford-nj
else
	PROJECT=rutherford-nj-beta-site
endif
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

third-party-packages: \
	package-jquery \
	package-lscache \
	package-lunr \
	package-slick-carousel \
	package-modernizr
### END Third Party Packages ###


pre-jekyll-build: third-party-packages bundle-packages


dev: pre-jekyll-build
	mkdir -p _site & \
	$(JEKYLL_BUILD) --watch & \
	./node_modules/.bin/serve --listen 8080 _site/


prod: pre-jekyll-build
	$(JEKYLL_BUILD)
	bundle exec htmlproofer ./_site --only-4xx --check-favicon --check-html --disable-external


deploy: npm-packages prod
	$(PREDEPLOY)
	$(FIREBASE_DEPLOY) --project=$(PROJECT)



npm-packages:
	npm install


bundle-packages:
	bundle install


clean:
	rm package-lock.json
	rm Gemfile.lock
	rm -rf node_modules
	rm -rf _site
