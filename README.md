dnmonster
=========

Provides unique monster avatars for given string.

Based on [monsterid.js](https://github.com/KevinGaudin/monsterid.js/) by Kevin Gaudin. This project wraps the original code in a Node server which listens to http://0.0.0.0:8080/monster/MY_ID.

## Runnig Heroku Container Registry and Runtime
https://devcenter.heroku.com/articles/container-registry-and-runtime

```
heroku create
heroku container:push web
```

wait for a while then

```
heroku open
```

and add the path like `monster/zunda?size=256` to the URL.
