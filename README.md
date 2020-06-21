# add like and view to ghost platform v3


## setup
- start ghost
- add integrations to ghost
- add webhook for post.created & post.updated to localhost:2378/created-post
- setup .env file to set environment vars
- use pm2 to start index.js

### environment
- KEY: ghost integration CONTENT KEY
- HOST: local address of ghost with its local port
- PORT: application port. default is 2378. this port must be set in ghost integration webhook

## start
pm2 start index.js --name like-n-view

## use
send POST to /like/:post_slug and /view/:post_slug to add to like and view of the post with slug.

GET post's like and view from /info/:post_slug to get a json like:
```json
{
    "like": 12,
    "view": 215
}
```

## backup

all data is saved in 'data.json' in project folder. you can save it for backup