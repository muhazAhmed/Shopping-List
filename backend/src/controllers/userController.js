const userModel = require("../models/userModel");
const jwt =require("jsonwebtoken")

const register = async (req, res) => {
    try {
        let data = req.body
        let { username, email} = data
        if (!username){
            return res.status(400).json("please enter username")
        }
        if (!email){
            return res.status(400).json("please enter email")
        }
        let checkMail = await userModel.findOne({email})
        if (checkMail){
            return res.status(400).json("Email ALdready registerd")
        }
        let saveData = await userModel.create(data)
        return res.status(201).json(saveData)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const login = async (req, res) => {
    try {
        let data = req.body.email
        if (!data){
            return res.status(400).json("please enter data")
        }
        let checkMail = await userModel.findOne({data})
        if(!checkMail){
            return res.status(400).json("Not registerd")
        }
        const token = jwt.sign(
            {
              userId: checkMail._id.toString(),
            },
            "shoppinglist",
            { expiresIn: "1h" }
            );
            const { newPassword, ...other } = checkMail
            let User = checkMail
            
            res.cookie("access_token", token, 
            {
              httpOnly: true,
            }).status(200).json(User);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


const logout = async (req, res) => {
    try {
      res
        .clearCookie("cookies_token", {
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json("logged out");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
  


module.exports = {register, login,logout}