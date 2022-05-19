import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;
export let ObjectID = mongodb.ObjectId;

let app = express();
let db;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', (req, res) =>{
  res.send(' -> Hello from Express <-');
});

app.get('/projects', (req,res) =>{
  //res.send(projects);
  db.collection('projects').find().toArray( (err,all) =>{
    if (err) {
      console.error(err.message); 
      return res.sendStatus(500);
    }
    res.send(all);
  })
});

app.post('/projects', (req, res) =>{
  let new_project ={
    name: req.body.name
  };
  db.collection('projects').insert(new_project, (err, result) => {
    if (err) {console.error(err.message); return res.sendStatus(500);}
    res.send(new_project);
  });
});

app.put('/projects/:id', (req, res)=>{
  db.collection('projects').updateOne({_id: ObjectID(req.params.id)},
      {$set: {name: req.body.name}}, 
      (err, result) =>{
        if (err) {
          console.error(err.message); 
          return res.sendStatus(500);
        }
        res.send(`UPDATE ${req.params.id} to ${ req.body.name}`);
        res.sendStatus(200);
  });
})

app.delete('/projects/:id', (req, res)=>{
  db.collection('projects').deleteOne({_id: ObjectID(req.params.id)},
  (err,result) => {
    if (err) {
      console.error(err.message); 
      return res.sendStatus(500);
    }
    res.send(`${result.name} was Delete!`);
    res.sendStatus(200);
  })
});

app.get('/projects/:id', (req,res) =>{
  const id = ObjectID(req.params.id);
  db.collection('projects').findOne({_id: id}, (err, one) =>{
    if (err) {
      console.error(err.message); 
      return res.sendStatus(500);
    }

    res.send(one);
  });

});

 MongoClient.connect('mongodb://127.0.0.1:27017/projects', (err, database)=>{
  if (err) return console.error(err.message);
  db = database.db('projects');
  app.listen(3030, ()=>{
    console.log('Server start');
  })
});


