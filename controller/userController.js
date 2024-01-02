const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.addUser = async(req, res) => {

    const { email, password, firstname, lastname } = req.body;
    
    const newUser = userModel({
        email,
        password, 
        firstname,
        lastname
    });

    try {
    
        const oldUser = await userModel.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("Email Already Exist. Please Login");
        }
    
        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash;
        await newUser.save();
    
        res.status(201).json(newUser);
    
    } catch(error) {
        res.status(400).json({message: error.message})
    }
    
}

exports.getAllUsers = async(req, res) => {
    try{        
        const data = await userModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getUserById = async(req, res) => {
    const data = await userModel.findById(req.params.id);
    res.json(data)
}

exports.editUser =  async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        
        if (updatedData.password){
            const hash = await bcrypt.hash(updatedData.password, 10);
            updatedData.password = hash;
            
            const result = await userModel.findByIdAndUpdate(
            id, updatedData, options
            );
        
           return res.send(result);
           
        }
        
        const result = await userModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
        
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findByIdAndDelete(id)
        if (!data) {
            res.send(`L'utilisateur n'existe pas'..`)
        }
        res.send(`Le Document avec le nom ${data.prenom} ${data.nom} a été supprimé..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
