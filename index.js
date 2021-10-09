//server
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json());  //gives us access to request.body? so we can get json data 

//routes

//create a todo
app.post ("/todos" , async (req,res) => {
    try {
        const {description} = req.body //creating todo? .. client side
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *", //postgres komande $1 je placeholder za description u ovom slucaju
        [description]); //inserting in db

        res.json(newTodo.rows[0]); //where data is located at
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos

app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //get a todo
  
  app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",  //more specific
      [id]);
  
      res.json(todo.rows[0]); //gets 1st item
    } catch (err) {
      console.error(err.message);
    }
  });

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params; //id
      const { description } = req.body; //data 
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2", //most complex
        [description, id] 
      );
  
      res.json("Todo was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //delete a todo
  
  app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
        id
      ]); //we just need to know where its located (id)
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

//listens port
app.listen(5000, () => {
    console.log("server has started on port 5000");
  });



