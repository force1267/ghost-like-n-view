require('dotenv').config()

const { add, get: posts, like, view } = require('./db')
const express = require('express')
const body = require('body-parser')
const helmet = require('helmet')

const app = express()
app.use(helmet())
app.use(body.json())

// internal
app.post('/post-created', (req, res) => {
    let current = req.body.post.current.slug
    let previous = req.body.post.current.slug
    if(previous !== current) {
        add(current)
    } else {
        let post = add(current)
        let old = posts(previous)
        post.like = old.like
        post.view = old.view
    }
    return res.end()
})

// expose
app.post('/like/:post', (req, res) => {
    like(req.params.post)
    return res.end()
})

app.post('/view/:post', (req, res) => {
    view(req.params.post)
    return res.end()
})

app.get('/info/:post', (req, res) => {
    return res.json(posts(req.params.post))
})


let PORT = process.env.PORT || 2378
app.listen(PORT)
console.log("likenview listening to", PORT)