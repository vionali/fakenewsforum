const express = require('express');
const router  = express.Router();


function makeRouter(Posts) {
  router.get('/', (req, res) => {
    let posts=Posts.all()
    posts.forEach(p => setMayVote(p, req.session.username))
    console.log(posts)
    res.render('pages/index', {
      posts: posts,
      username: req.session.username || null,
      loggedIn: req.session.username? true: false
    })
  })

  router.get('/new', (req, res) => {
    if (!req.session.username) {
      return res.redirect('/user/register')
    }
      res.render('pages/add-post', {
        username: req.session.username || null,
        loggedIn: req.session.username? true: false
      })
  })
  router.post('/new', (req, res) => {
    console.log("POST new")
    if (!req.session.username) {
      console.log("not authenticated!")
      return res.status(403).send("Login first")
    }
    console.log(req.body)
    let post = req.body
    post.user=req.session.username
    post.date=new Date()

    try {
      let postId= Posts.create(post)
      console.log(postId)
      return res.status(200).send('/'+postId);
    }
    catch(err) {
      return res.status(400).send(err.message)
    }

  })

  router.get('/:postId', (req, res) => {
    let post=Posts.get(req.params.postId)
    if (!post) return res.status(404).send("Not found")
    setMayVote(post, req.session.username)
    res.render('pages/post', {
      post: post,
      username: req.session.username || null,
      loggedIn: req.session.username? true: false
    })
  })

  router.post('/:postId/comment', (req, res) => {
    console.log(req.body)
    if (!req.session.username) {
      console.log("not authenticated!")
      return res.status(403).send("Login first")
    }
    try {
      let comment = Posts.comment(req.params.postId, {
        text: req.body.text,
        user: req.session.username
      })
      return res.status(201).send(comment)
    }
    catch( err ){
      return res.status(400).send(err.message)
    }
  })


  router.post('/:postId/upvote', (req, res) => {
    console.log("Upvote: "+req.params.postId)
    if (!req.session.username) {
      return res.status(403).send("Forbidden")
    }

    Posts.upvote(req.params.postId, req.session.username)
    res.status(200).send("done")
  })

  router.post('/:postId/downvote', (req, res) => {
    console.log("Downvote: "+req.params.postId)

    if (!req.session.username) {
      return res.status(403).send("Forbidden")
    }

    Posts.downvote(req.params.postId, req.session.username)
    res.status(200).send("done")
  })

  router.post('/:postId/upvote/:commentId', (req, res) => {
    if (req.session.username) {
      return res.status(403).send("Forbidden")
    }

    Posts.upvote(req.params.postId, req.params.commentId)
    res.status(200).send("done")

  })

  router.post('/:postId/downvote/:commentId', (req, res) => {
    if (req.session.username) {
      return res.status(403).send("Forbidden")
    }

    Posts.downvote(req.params.postId, req.params.commentId)
    res.status(200).send("done")

  })
  return router;
}

function setMayVote(post, username) {
  console.log(username)
  console.log(post.voters)
  post.mayVote=false
  if (username == undefined) {
    post.mayVote=false;
    return
  }
  if (username != post.user && !post.voters.includes(username)) {
    post.mayVote=true;
  }
}
module.exports=makeRouter
