# Set SITE_WORKSPACE when running locally.
SITE_WORKSPACE := $(if $(SITE_WORKSPACE),$(SITE_WORKSPACE),$(PWD))
export SITE_WORKSPACE
JEKYLL_IMAGE := jekyll/builder:4.2.2

compile-typescript:
	docker run --rm \
		-v $(SITE_WORKSPACE):/srv/jekyll \
		-w /srv/jekyll/static \
		$(JEKYLL_IMAGE) /bin/bash -c "yarn && yarn run build"


build-requirements: compile-typescript
	mkdir -p _site .jekyll-cache


local-ci: build-requirements 
	./scripts/local-ci/start-local-ci.sh


stop-dev-site:
	docker stop rutherford-dev-site || true


dev-typescript:
	docker run --rm \
		-v $(SITE_WORKSPACE):/srv/jekyll \
		-w /srv/jekyll/static \
		$(JEKYLL_IMAGE) /bin/bash -c "npm install && npm run watch"


dev: stop-dev-site build-requirements
	docker run -it --name=rutherford-dev-site --rm -p 0.0.0.0:38081:8080 \
    -v $(SITE_WORKSPACE):/srv/jekyll \
    $(JEKYLL_IMAGE) jekyll serve --watch -P 8080 -p /dev/null


prod: build-requirements
	docker run \
    -v $(SITE_WORKSPACE):/srv/jekyll \
    $(JEKYLL_IMAGE) jekyll build


deploy: prod
	docker run \
	  -v $(SITE_WORKSPACE):/work \
	  -v $(HOME):/github_home \
	  -e GOOGLE_APPLICATION_CREDENTIALS=/github_home/gcloud.json \
	  -w /work \
	  andreysenov/firebase-tools \
	  firebase deploy --project=$(FIREBASE_PROJECT)