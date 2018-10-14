FIREBASE_DEPLOY = ./node_modules/.bin/firebase deploy --non-interactive --token=$(RBH_FIREBASE_TOKEN)


JEKYLL_BUILD = bundle exec jekyll build


ifeq ($(TRAVIS_BRANCH), www)
	PREDEPLOY=rm ./_site/robots.txt
	PROJECT=rutherford-nj
else
	PROJECT=rutherford-nj-beta-site
endif



pre-jekyll-build: npm-packages bundle-packages
	mkdir -p third_party
	cp ./node_modules/jquery/dist/jquery.min.js third_party/jquery.min.js
	cp ./node_modules/lscache/lscache.min.js static/js/lscache.min.js
	cp ./node_modules/lunr/lunr.js third_party/lunr.js
	cp -R ./node_modules/slick-carousel/slick third_party/
	./node_modules/.bin/modernizr --config=modernizr-config.json --dest=static/js/modernizr.js


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
