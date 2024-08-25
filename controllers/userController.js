const User  = require('../models/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// signup

const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {

        if (!email || !password) {
            throw Error('All field required')
        }
        if (!validator.isEmail(email)) {
            throw Error('Email not valid')
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough')
        }
        
        const exist = await User.findOne({ email });

        if (exist) {
            throw Error('Email already exist');
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await User.create({ email, password: hash })
        console.log('user', user);
        const token = jwt.sign({ userId: user._id }, process.env.SECRET);
        return res.status(200).json({ user, token });
    }
    catch (error) {
        console.log("Error :", error);
        return res.status(500).json({ error: error.message });
    }
}


//loginUser
const loginUser = async (req, res) =>{

    const {email, password} = req.body
  
    try{
        
        const user  = await User.findOne({ email })

        if(!user){
            throw Error('user need to signup')
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match){
            throw Error('Incorrect password')
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET);

        return res.status(200).json({user,token})
    }
catch(error){
    console.log("Error :", error);
    return res.status(500).json({error:error.message})
}
}

module.exports = {signupUser,loginUser}
