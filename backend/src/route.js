const express = require('express')
const router = express.Router()
const user =require("./controllers/userController")
const admin =require("./controllers/adminController")
const list =require("./controllers/listController")

router.post("/register",user.register)
router.post("/login",user.login)
// router.post("/logout",user.logout)


router.post("/createProduct",admin.create)

router.get("/dropDownList",list.fetchProduct)
router.post("/updateList",list.list)





module.exports = router