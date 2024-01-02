const express = require('express');

const { addUser, getAllUsers, getUserById, editUser, deleteUser } = require('../controller/userController');
const { todoList, getAllTodo, getTodoById, getTodoByUserId, editTodo, deleteTodo } = require('../controller/todoContoller');
const { login } = require('../controller/authController');

const router = express.Router()
module.exports = router;


//Post method
router.post("/login", login);
router.post('/user', addUser);
router.post('/todo', todoList);

//Get method
router.get('/getUser', getAllUsers)
router.get('/getUserById/:id', getUserById)
router.get('/getTodo', getAllTodo)
router.get('/getTodoById/:id', getTodoById)
router.get('/getTodoByUser/:id', getTodoByUserId)

//Update by ID Method
router.patch('/editUser/:id',editUser)
router.patch('/editTodo/:id',editTodo)

//Delete by ID Method
router.delete('/deleteUser/:id', deleteUser)
router.delete('/deleteTodo/:id', deleteTodo)


