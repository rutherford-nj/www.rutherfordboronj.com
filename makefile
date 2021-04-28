# Set SITE_WORKSPACE when running locally.
SITE_WORKSPACE := $(if $(SITE_WORKSPACE),$(SITE_WORKSPACE),$(PWD))
export SITE_WORKSPACE


compile-typescript:
	docker run --rm \
				-v $(SITE_WORKSPACE):/srv/jekyll \
				jekyll/builder:latest /bin/bash -c "cd static && npx webpack"


build-requirements: compile-typescript
	mkdir -p _site .jekyll-cache


local-ci: build-requirements 
	./scripts/local-ci/start-local-ci.sh


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