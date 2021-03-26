const { Router } = require('express');
const express = require ('express');
const bcrypt = require ('bcryptjs');
const jwt = require ("jsonwebtoken");
const passport= require('passport');
const UserModal = require( "../models/user.js");

const secret = 'test';
const router = Router();

router.route('/signup').post(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    //res.header("Access-Control-Allow-Origin", "*");
    try {
      const oldUser = await UserModal.findOne({ email });
  //res.status(400).json({ message: "User already exists" });
      if (oldUser) return res.status(400).json({ message: "User already exists" });
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
  
      const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong"});
      console.log(password);
      console.log(error);
    }
  });
  
  
module.exports=router;