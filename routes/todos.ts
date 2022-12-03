import { Router } from "express";
import { Todo } from "../model/todo";
const router = Router();

let todos: Todo[] = []; //Todo is an interface {id:string,text:string}

router.get("/", (req, res) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res) => {
  const newTodo: Todo = { id: new Date().toISOString(), text: req.body.text };
  todos.push(newTodo);
  res.status(200).json({ todos, msg: "success" });
});
router.post("/todo/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  let found = false;
  for (const t of todos) {
    if (t.id === id) {
      t.text = req.body.text;
      found = true;
      break;
    }
  }
  if (found) {
    return res.status(200).send({ todos, msg: "success updated" });
  }
  res.status(400).send({ msg: "ID not found" });
});

router.delete("/todo/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  let found = false;
  todos = todos.filter((t) => {
    if (t.id !== id) {
      return true;
    } else {
      found = true;
      return false;
    }
  });
  if (found) {
    return res.status(200).send({ todos, msg: "success deleted" });
  }
  res.status(400).send({ msg: "ID not found,not deleted" });
});

export default router;
