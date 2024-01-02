const todoModel = require("../models/todoModel");
const userModel = require("../models/userModel");

exports.todoList = async(req, res) => {

    const { textTodo, userId, title } = req.body;
    
    const todos = todoModel({
       textTodo,
        title,
        userId
    });
    
    try {
      
      const user = await userModel.findOne({ userId });
    
        if (!user) {
          return res.status(409).send("User does not exist");
        }
        // const hash = await bcrypt.hash(newUser.password, 10);
        // newUser.password = hash;
        // users.push(newUser);
        // // res.json(newUser);
        await todos.save();
    
        res.status(201).json(todos);
    
    } catch(error) {
        res.status(400).json({message: error.message})
    }
    
}

exports.getAllTodo = async(req, res) => {
    try{        
        const data = await todoModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getTodoById = async(req, res) => {
    const data = await todoModel.findById(req.params.id);
    res.json(data)
}

exports.getTodoByUserId = async(req, res) => {
    const data = await todoModel.find({ userId: req.params.id });
    res.json(data)
}

exports.editTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        
        const result = await todoModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
        
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteTodo = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await todoModel.findByIdAndDelete(id)
        if (!data) {
            res.send(`Le todoList n'existe pas'..`)
        }
        res.send(`Le Document avec le text ${data.textTodo} a été supprimé..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
