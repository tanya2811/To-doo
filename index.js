const express =  require('express');
const path = require('path');
const bodyParser= require('body-parser');
const port = 8080;

const db = require('./config/mongoose');
const List=require('./models/list')

const app = express();

app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/style')))

app.get('/', function(req, res) {
    List.find({})
      .then((todos) => {
        return res.render('home', {
          title: "Task List",
          task_list: todos
        });
      })
      .catch((err) => {
        console.log("Error in fetching tasks:", err);
        return;
      });
  });

  app.post('/to-do', function(req, res){
    List.create({ task: req.body.task})
  .then((list) => {
    console.log('List created:', list);
  })
  .catch((error) => {
    console.error('Error creating List:', error);
  });
  return res.redirect('/');
})
  
app.get('/deletecont/',(req,res)=>{
  console.log(req.query);
  let id = req.query.id;
  //find the list in database using id and delete it
  List.findByIdAndDelete(id)
  .then(() => {
    return res.redirect('back');
  })
  .catch((err) => {
    console.log('Error in deleting an object from the database:', err);
    return;
  });
});

app.put('/tasks/:id', (req, res) => {
  let taskId = req.params.id;
  let updatedTask = req.body.updatedTask;

  // Update the task in the database using findByIdAndUpdate
  List.findByIdAndUpdate(taskId, { task: updatedTask }, { new: true }) // Add { new: true } to return the updated task
    .then((updatedTask) => {
      // Do something with the updated task
      console.log('Updated Task:', updatedTask);
      res.redirect('/tasks');
    })
    .catch((err) => {
      console.log('Error in updating a task in the database:', err);
      return res.status(500).send('Error updating task in the database');
    });
});

app.get('/updatecont', (req, res) => {
  let taskId = req.params.id;

  // Retrieve the updated task from the database using findById
  List.findById(taskId)
    .then((task) => {
      res.render('task', { task });
    })
    .catch((err) => {
      console.log('Error in retrieving task from the database:', err);
      return res.status(500).send('Error retrieving task from the database');
    });
});



app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})