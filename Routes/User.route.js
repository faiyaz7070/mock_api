const express = require("express");
const { User } = require("../Models/User.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const userRouter = express.Router();

userRouter.get("/", async(req,res) =>{
    const user = await User.find()
    res.send(user)
})

///Registering the user

userRouter.post("/signup" ,async (req,res) => {

    const { email, password, confirmPassword } = req.body;

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Failed to signup', err);
    res.status(500).json({ error: 'Failed to signup' });
  }
     
})

///Login the user


userRouter.post("/login", async (req,res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the entered password with the stored password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ email: user.email }, 'secret_key');
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Failed to login', err);
      res.status(500).json({ error: 'Failed to login' });
    }
})




module.exports = {
    userRouter
}

