const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const check = require("../middleware/midleware");


exports.login = async (req, res, next) => {
    
    let { email, password } = req.body;

    let existingUser;

    existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).send("email doesn't exist...!");
    }else if(existingUser.etat == false){
      return res.status(401).send("user is disabled...!");
    }
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).send("password is invalid");
    }


    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
          process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new Error("Erreur! Quelque chose s'est mal passée.");
      return next(error);
    }
   
    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
          token: existingUser.token
        },
      });
}