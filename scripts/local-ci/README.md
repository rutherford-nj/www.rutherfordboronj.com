# Local CI

To start a local CI server hosting the site run `make local-ci` from the root
of the project. This will:

- Build a docker image with a webhook listener on port 58778.
  - On `push` from Github, this process will `git fetch` and checkout the new
    commit.
- Start a `jekyll serve` process on port 58777.

This should all be done from a fresh clone of the repository using HTTPS,
not SSH.
