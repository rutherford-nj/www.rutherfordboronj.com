## GitHub

The site is managed almost entirely through GitHub. The [rutherford-nj/www.rutherford-nj.com repository](https://github.com/rutherford-nj/www.rutherford-nj.com) houses the configuration for a Jekyll-based website, which automatically publishes to www.rutherfordboronj.com (see the section on Travis CI below).

## Jekyll

Jekyll is a program that makes building template-based, blog-aware websites easy, without the need for a database or application server running. When `jekyll build` is run, the contents of the GitHub repository are converted into a static website which can be served from any simple web server (or cloud based hosting, as described below in Firebase Hosting). Further documentation on Jekyll can be found on the [Jekyll website](http://jekyllrb.com/).

## Travis CI

The configuration for Travis CI can be found [in the repository](https://github.com/rutherford-nj/www.rutherford-nj.com/blob/master/.travis.yml). While Travis CI is not a necessary part of the equation, it drastically simplifies the edit-to-deploy process. [Here is a diagram](https://mermaidjs.github.io/mermaid-live-editor/#/view/c2VxdWVuY2VEaWFncmFtCiAgICBEZXZlbG9wZXItPj5HaXRIdWI6IE1ha2UgQ2hhbmdlCiAgICBHaXRIdWItPj5UcmF2aXMgQ0k6IEhleSwgc29tZXRoaW5nIGNoYW5nZWQKICAgIFRyYXZpcyBDSS0+PkdpdEh1YjogRG93bmxvYWQgc2l0ZSBjb25maWd1cmF0aW9uCiAgICBUcmF2aXMgQ0ktPj5UcmF2aXMgQ0k6IEJ1aWxkIHNpdGUKICAgIFRyYXZpcyBDSS0+PkZpcmViYXNlIEhvc3Rpbmc6IERlcGxveSBzaXRlIGlmIGJ1aWxkIHN1Y2NlZWRzCiAgICBUcmF2aXMgQ0ktLT4+RGV2ZWxvcGVyOiBFbWFpbCBpZiBidWlsZCBmYWlscw==) of what happens after each commit to the GitHub repository.

On commit, GitHub sends a Webhook POST message to Travis CI. Travis CI:

1. Downloads the entire repository to a machine.
2. Installs Jekyll and [html-proofer](html-proofer).
3. Runs `jekyll build` on the repository, which creates a `_site` directory containing the site which will be published.
4. Runs `html-proofer` on `_site`, checking for various errors (bad links, mis-authored HTML, etc.).
5. Copies the entire contents of `_site` to the Firebase Hosting project.

If the html-proofer step fails for any reason, the "deploy to Firebase Hosting" step will not occur, and the site will not be updated.

## Notes on Jekyll and Travis CI

Jekyll is not strictly necessary for the site to function. The result of `jekyll build` is a fully functioning static website which can be modified through normal means and changed directly on the hosting provider.

Just as Jekyll is not necessary, neither is Travis CI. Another option for deploying is to modify the Jekyll site and manually run `jekyll build` when it's time to deploy the site. The resulting `_site` directory can be manually uploaded to any hosting provider. Doing so would not be as pleasant as using Jekyll and the continuous build process, but it would work.

## Firebase Hosting

There are two projects that host all of the content on the site. The www site is served from the [rutherford-nj project](https://console.firebase.google.com/project/rutherford-nj/hosting), the beta site is served from the [rutherford-nj-beta project](https://console.firebase.google.com/project/rutherford-nj-beta/hosting)

### Large Files

There is a Google Cloud Storage bucket for files which do not need to be part of the version control named [static.rutherford-nj.com](https://console.cloud.google.com/storage/browser/static.rutherford-nj.com/?project=rutherford-nj). Large files (primarily PDFs) are stored here. This is to make managing these files slightly easier, as well as avoid creating a large git repository.
