import { Router } from "express";
import { Todo } from "../model/todo";
const router = Router();

let todos: Todo[] = []; //Todo is an interface {id:string,text:string}

//using Alias to define how our request body and req params look like
type RequestBody = { text: string };
type RequestParams = { id: string };

router.get("/", (req, res) => {
  res.status(200).json({ todos });
});

router.post("/todo", (req, res) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = { id: new Date().toISOString(), text: body.text };
  todos.push(newTodo);
  res.status(200).json({ todos, msg: "success" });
});
router.post("/todo/:id", (req, res) => {
  const param = req.params as RequestParams;
  const body = req.body as RequestBody;
  const id = param.id;
  console.log(id);
  let found = false;
  for (const t of todos) {
    if (t.id === id) {
      t.text = body.text;
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
  const param = req.params as RequestParams;
  const id = param.id;
  // console.log(id);
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
