let testUsers= [
  {
    name: "Viona",
    password: "Password"
  },
  {
    name: "Daniel",
    password: "123456"
  },
  {
    name:"Chris Zog",
    password:"000111"
  },

]
const FileStore = require('./fileStore');
let store = new FileStore(__dirname+'/data/users.json')
class Users {
  constructor() {
    this.users=store.get();
    //this.users={}
  }
  create(user) {
    if (this.users[user.name]) throw new Error("Username already taken!")
    delete user.password2
    this.users[user.name] = user;
    console.log("created "+user.name)
    store.save(this.users)
  }
  isPassword(username, password) {
    console.log(username)
    console.log(password)
    if (!this.users[username]) return false;
    return this.users[username].password === password;
  }

}
module.exports=new Users();
//testUsers.forEach(u => module.exports.create(u))
