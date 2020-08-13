const fs = require('fs')
const axios = require('axios').default

const promisify = require('util').promisify

const read = promisify(fs.readFile)
const write = promisify(fs.writeFile)

var posts = {}

;(async () => {
    try {
        posts = JSON.parse(await read('./data.json'))
        let { data: res } = await axios(`http://${process.env.HOST}/ghost/api/v3/content/posts/?key=${process.env.KEY}`)
        for(let post of res.posts) {
            if(!posts[post.slug]) {
                posts[post.slug] = {
                    like: 0,
                    view: 0
                }
            }
        }
    } catch (err) {
        console.log("trying to get posts for first time from", (`http://${process.env.HOST}/ghost/api/v3/content/posts/?key=${process.env.KEY}`))
        let { data: res } = await axios(`http://${process.env.HOST}/ghost/api/v3/content/posts/?key=${process.env.KEY}`)
        posts = {}
        for(let post of res.posts) {
            posts[post.slug] = {
                like: 0,
                view: 0
            }
        }
        await write('./data.json', JSON.stringify(posts))
    }
})()
.catch(console.error)

setInterval(async () => {
    try {
        await write('./data.json', JSON.stringify(posts))
    } catch (err) {
        console.error(err)
    }
}, 5 * 60 * 1000) // every 5 mins

function add(post) {
    return posts[post] = {
        like: 0,
        view: 0
    }
}

function get(post) {
    return posts && posts[post]
}

function like(post) {
    return posts[post] && posts[post].like ++
}

function view(post) {
    return posts[post] && posts[post].view ++
}

module.exports = { add, get, like, view }