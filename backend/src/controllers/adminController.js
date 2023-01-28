const adminModel = require("../models/adminModel")

const create=async(req,res)=>{
    try {
        let data =req.body
        let{name,cost}=data
        if(!cost){
            return res.status(400).json("please enter cost")
        }
        if(!name){
            return res.status(400).json("please enter product name")
        }
        let uniqueName=await adminModel.findOne({name})
        if(uniqueName){
            return res.status(400).json("product is already added")
        }
        let saveData=await adminModel.create(data)
        return res.status(201).json(saveData)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}



module.exports={create}