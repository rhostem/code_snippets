[The Gist to Clone All Gists](https://gist.github.com/mbostock/3883098)

Run like so:

```bash
chmod u+x gist-clone-all
./gist-clone-all username OAUTH_TOKEN
```

You'll want to replace “username” with your own username and “OAUTH_TOKEN” with an OAuth token.

This script clones using the *push* URL, so you should probably be the owner of the gists. You could also use this to clone someone else's gists, but in that case you may wish to edit the code to use `gist_pull_url` instead.