# Set SITE_WORKSPACE when running locally.
SITE_WORKSPACE := $(if $(SITE_WORKSPACE),$(SITE_WORKSPACE),$(PWD))

### BEGIN Third Party Packages ###
package-jquery: npm-packages
	mkdir -p third_party/jquery
	cp ./node_modules/jquery/dist/jquery.min.js third_party/jquery/jquery.min.js

package-lscache: npm-packages
	mkdir -p third_party/lscache
	cp ./node_modules/lscache/lscache.min.js third_party/lscache/lscache.min.js

package-lunr: npm-packages
	mkdir -p third_party/lunr
	cp ./node_modules/lunr/lunr.js third_party/lunr/lunr.js

package-slick-carousel: npm-packages
	mkdir -p third_party
	cp -R ./node_modules/slick-carousel/slick third_party/

package-moment-tz: npm-packages
	mkdir -p third_party/moment
	cp ./node_modules/moment/min/moment.min.js third_party/moment/moment.min.js
	cp ./node_modules/moment-timezone/builds/moment-timezone-with-data-10-year-range.min.js third_party/moment/moment-tz-with-data.min.js

package-modernizr: npm-packages
	mkdir -p third_party/modernizr
	docker run \
		-v $(SITE_WORKSPACE):/srv/jekyll \
		jekyll/builder:latest /bin/bash -c "true && \
		./node_modules/.bin/modernizr \
		--config=modernizr-config.json \
		--dest=third_party/modernizr/modernizr.js"

package-nanogallery2: npm-packages
	cp -R ./node_modules/nanogallery2/dist third_party/nanogallery2

package-firebase-tools: npm-packages

third-party-js-packages: \
	package-jquery \
	package-lscache \
	package-lunr \
	package-slick-carousel \
	package-moment-tz \
	package-modernizr \
	package-nanogallery2
### END Third Party Packages ###


build-requirements: third-party-js-packages


dev: build-requirements
	mkdir -p _site
	docker run -it -p 8080:8080 \
        -v $(PWD):/srv/jekyll -v $(PWD)/_site:/srv/jekyll/_site \
        jekyll/builder:latest /bin/bash -c "chmod 777 /srv/jekyll && jekyll serve --watch -P 8080 -p /dev/null/"


prod: build-requirements
	docker run \
        -v $(SITE_WORKSPACE):/srv/jekyll -v $(SITE_WORKSPACE)/_site:/srv/jekyll/_site \
        jekyll/builder:latest /bin/bash -c "chmod 777 /srv/jekyll && jekyll build"


deploy: prod package-firebase-tools
	./node_modules/.bin/firebase deploy --non-interactive --token=$(RBH_FIREBASE_TOKEN) --project=$(FIREBASE_PROJECT)


npm-packages:
	docker run \
		-v $(SITE_WORKSPACE):/srv/jekyll \
		jekyll/builder:latest /bin/bash -c "time npm install"


clean:
	rm package-lock.json
	rm -rf node_modules
	rm -rf _site
	rm -rf third_party
