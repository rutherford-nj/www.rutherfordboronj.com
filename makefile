# Set SITE_WORKSPACE when running locally.
SITE_WORKSPACE := $(if $(SITE_WORKSPACE),$(SITE_WORKSPACE),$(PWD))
export SITE_WORKSPACE

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

package-moment-tz: npm-packages
	mkdir -p third_party/moment
	cp ./node_modules/moment/min/moment.min.js third_party/moment/moment.min.js
	cp ./node_modules/moment-timezone/builds/moment-timezone-with-data-10-year-range.min.js third_party/moment/moment-tz-with-data.min.js

package-modernizr: npm-packages
	mkdir -p third_party/modernizr
	docker run --rm \
		-v $(SITE_WORKSPACE):/srv/jekyll \
		jekyll/builder:latest /bin/bash -c "true && \
			./node_modules/.bin/modernizr \
			--config=modernizr-config.json \
			--dest=third_party/modernizr/modernizr.js"

package-nanogallery2: npm-packages
	cp -R ./node_modules/nanogallery2/dist third_party/nanogallery2

third-party-js-packages: \
	package-jquery \
	package-lscache \
	package-lunr \
	package-moment-tz \
	package-modernizr \
	package-nanogallery2
### END Third Party Packages ###


build-requirements: third-party-js-packages
	mkdir -p _site .jekyll-cache


local-ci: build-requirements
	docker container stop rutherford-site-webhook rutherford-site-server || true
	./scripts/local-ci/start-local-ci.sh
	docker run -d --rm -p 0.0.0.0:58777:8777 \
	--name=rutherford-site-server \
	-v $(SITE_WORKSPACE):/srv/jekyll \
	jekyll/builder:latest jekyll serve --watch -P 8777 -p /dev/null


dev: build-requirements
	docker run -it --rm -p 0.0.0.0:38080:8080 \
        -v $(SITE_WORKSPACE):/srv/jekyll \
        jekyll/builder:latest jekyll serve --watch -P 8080 -p /dev/null


prod: build-requirements
	docker run \
        -v $(SITE_WORKSPACE):/srv/jekyll \
        jekyll/builder:latest jekyll build


deploy: prod
	docker run \
	  -v $(SITE_WORKSPACE):/work \
	  -w /work \
	  andreysenov/firebase-tools \
	  firebase deploy --non-interactive --token=$(RBH_FIREBASE_TOKEN) --project=$(FIREBASE_PROJECT)


npm-packages:
	./scripts/build/npm_install.bash


clean:
	./scripts/build/cleanup.bash
