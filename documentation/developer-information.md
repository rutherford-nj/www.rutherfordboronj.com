## GitHub

The site is managed almost entirely through GitHub. The [rutherford-nj/www.rutherfordboronj.com repository](https://github.com/rutherford-nj/www.rutherfordboronj.com) houses the configuration for a Jekyll-based website, which automatically publishes to www.rutherfordboronj.com (see the section on GitHub Actions below).

## Jekyll

Jekyll is a program that makes building template-based, blog-aware websites easy, without the need for a database or application server running. When `jekyll build` is run, the contents of the GitHub repository are converted into a static website which can be served from any simple web server (or cloud based hosting, as described below in Firebase Hosting). Further documentation on Jekyll can be found on the [Jekyll website](http://jekyllrb.com/).

## GitHub Actions

The configuration for GitHub Actions can be found [in the repository](../.github/workflows). While GitHub Actions not a necessary part of the equation, it drastically simplifies the edit-to-deploy process.

On commit, a workflow is started to:

1. Download the entire repository to a virtual machine.
2. Install necessary npm modules.
3. Runs `jekyll build` on the repository from a Docker container, which creates a `_site` directory containing the site which will be published.
4. Runs `html-proofer` as a Jekyll plugin on `_site`, checking for various errors (bad links, mis-authored HTML, etc.).
5. Copies the entire contents of `_site` to the Firebase Hosting project.

If the html-proofer step fails for any reason, the "deploy to Firebase Hosting" step will not occur, and the site will not be updated.

## Notes on Jekyll and GitHub Actions

Jekyll is not strictly necessary for the site to function. The result of `jekyll build` is a fully functioning static website which can be modified through normal means and changed directly on the hosting provider.

Just as Jekyll is not necessary, neither are GitHub Actions. Another option for deploying is to modify the Jekyll site and manually run `jekyll build` when it's time to deploy the site. The resulting `_site` directory can be manually uploaded to any hosting provider. Doing so would not be as pleasant as using Jekyll and the continuous build process, but it would work.

## Hosting

### Firebase Hosting

There are two projects that host all of the content on the site. The www site is served from the [rutherford-nj project](https://console.firebase.google.com/project/rutherford-nj/hosting), the beta site is served from the [rutherford-nj-beta project](https://console.firebase.google.com/project/rutherford-nj-beta/hosting)

### Large Files

There is a Google Cloud Storage bucket for files which do not need to be part of the version control named [static.rutherford-nj.com](https://console.cloud.google.com/storage/browser/static.rutherford-nj.com/?project=rutherford-nj). Large files (primarily PDFs) are stored here. This is to make managing these files slightly easier, as well as avoid creating a large git repository.
