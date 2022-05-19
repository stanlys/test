


export let state = {
  db: null
};

const connect = function (url, done){
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, (err, db) =>{
    if (err){
      return done(err);
    }
    state.db = db;
    done();
  });
}
