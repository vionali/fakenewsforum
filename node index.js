const dateFormat = require('dateformat');

let samplePosts=[
  {
    title: "Is this true",
    pictureUrl: "eye.jpg",
    text: "Bla bla bla bla bla",
    date: new Date(),
    user: "Viona",
    upvotes: 18,
    downvotes: 3,
    comments: [
      {
        id: 0,
        date: new Date(),
        text: "I like it",
        user: "Daniel",
        upvotes: 1,
        downvotes: 1312
      }
    ]
  }
]


class Posts {
  constructor() {
    this.posts={}
  }

  create(post) {
    post.id=this.generateId(post.title, post.date)
    post.formattedDate=dateFormat(post.date,"h:MM TT mmmm d, yyyy")
    post.comments= post.comments || [];
    post.upvotes = post.upvotes || 0;
    post.downvotes = post.downvotes || 0;
    post.voters=[]
    this.posts[post.id]=post

    console.log("created "+post.id)
    return post.id
  }

  get(postId) {
    return this.posts[postId]
  }
  all() {
    return Object.keys(this.posts).map(k => this.posts[k])
  }

  generateId(title, date) {
    let id=title.replace(/\W/g, "-");
    id += "-"+date.getTime();
    return id;
  }
  comment(postId, comment) {
    console.log(comment)
    comment.id=this.posts[postId].comments.length
    comment.upvotes=0
    comment.downvotes=0
    comment.date = new Date()
    this.posts[postId].comments.push(comment)

    console.log("Comment on "+postId)
    return comment;
  }
  upvote(postId, userId, commentId) {
    if (commentId === undefined) {
      this.posts[postId].upvotes++;
      this.posts[postId].voters.push(userId)
    }
    else {
      this.posts[postId].comments[commentId].upvotes++;
    }

  }
  downvote(postId, userId, commentId) {
    if (commentId === undefined) {
      this.posts[postId].downvotes++;
      this.posts[postId].voters.push(userId)
    }
    else {
      this.posts[postId].comments[commentId].downvotes++;
    }
  }
}

module.exports= new Posts();
samplePosts.forEach(p => module.exports.create(p))
