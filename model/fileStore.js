var fs = require('fs');
class FileStore {
  constructor(path) {
    this.path=path;
  }
  get() {
    return require(this.path)
  }
  save(data) {
    console.log("Saving "+this.path)
    console.log(data)
    console.log("--------------------")
    let stream=fs.createReadStream(this.path).pipe(fs.createWriteStream(this.path.replace('.json', '-'+new Date().toISOString()+'.json')));
    stream.on('finish', () => {
      fs.writeFile(this.path, JSON.stringify(data, null, 2), (err, ans) => {
        if (err) console.error("error: "+err)
        console.log(ans)
      })
    })
  }
}
module.exports=FileStore
/*
let store = new FileStore(__dirname+'/data/posts.json')
let data = store.get();
console.log(data)
let samplePosts=[
  {
    title: " Turn Brown Eyes Blue With 20-minute Laser Surgery??",
    pictureUrl: "eye.jpg",
    text: "Dr. Homer, who works at the Stroma Medical Corporation in Laguna Beach, California explains that everyone has blue eyes underneath their brown ones. By using a laser that's tuned in to a special frequency, he's developed a way to remove existing eye pigmentation from the irises of brown-eyed people in order to reveal the blue shade underneath. Here's a link of the article:http://www.naturalnews.com/045775_laser_surgery_eye_color_blue_pigments.html. Is this true?:O",
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
  },
  {
    title: "China Has It's Own Space Lab?",
    pictureUrl: "0004.jpg",
    text: "   China is preoaring to launch its first unmanned cargo spacecraft on a mission to dock with the country's space station.  Here’s a link to the article: https://phys.org/news/2017-04-china-cou ,China has it own space lab?!Is this true?",
    date: new Date(2017, 3, 20, 11, 17, 13, 0),
    user: "Chris Zog",
    upvotes: 15,
    downvotes: 3,
    comments: [
      {
        id: 0,
        date: new Date(2017, 3, 21, 20, 12, 13, 0),
        text: "CSS? that ISS is totaly bogus.I have cought them in a straight out cycle of fake footage and actual live no so live cut outs when they need to cut, it honestly is to much trouble to even begin with the desepion of NASA.",
        user: "Daniel",
        upvotes: 1,
        downvotes: 1312
      }
    ]
  },
  {
    title: "New Deadly Strain Of Marijuana Turning Users Gay?",
    pictureUrl: "0005.jpg",
    text:"Just when you thought the drug problem in Colorado could not get any worse, law enforcement officials are now reporting incidents of marijuana users not only overdosing and dying, but also turning gay.DENVER C.O. (AP) — “We’ve never seen anything like this before,” said Dr. Hans Vermhat of the Barrow Neurological Institute. “The drug addicts in Colorado are injecting a new strain of marijuana that changes the chemical makeup in the brain’s receptors which control the users like or dislike of the opposite sex; ultimately turning them into a flaming homosexual.”Michele Leonhart, DEA chief of operations in Denver, told ABC news that marijuana related problems in Colorado have quadrupled since its legalization a little over three years ago. Here's a link to the article:http://abcnews.com.co/marijuana-in-colorado-turning-users-gay/. ",
    date: new Date(2017, 3, 18, 21, 11, 10, 0),
    user: "Chris Zog",
    upvotes: 15,
    downvotes: 3,
    comments: [
      {
        id: 0,
        date: new Date(),
        text: "That's just ridiculous ",
        user: "Daniel",
        upvotes: 1,
        downvotes: 1312
      },
      {
        id: 0,
        date: new Date(),
        text: "LOL I wish i grew up with parents who'd accept 'the weed made me do it!' as an excuse",
        user: "Chris Zog",
        upvotes: 1,
        downvotes: 1312
      }
    ]
  },
]

store.save(samplePosts)*/
