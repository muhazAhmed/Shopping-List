const listModel=require("../models/listModel")
const adminModel =require("../models/adminModel")
const { updateOne } = require("../models/adminModel")

const fetchProduct = async (req,res)=>{
    try {
        let data = req.body
        let foundData= await adminModel.find({})
        return res.status(200).json(foundData)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const list = async (req,res)=>{
    try {
        let data=req.body
        let{email,items}=data
        let pname=data.items[0].products
 
            let name= await adminModel.findOne({name:pname})

            let presentList=await listModel.findOne({email})
            if(presentList){
                let p=name.cost*1
                
                let arr= presentList.items
                let adminP=name.name
                for(i = 0; i < arr.length; i++){
                    let listP=presentList.items[i].products

                if(adminP==listP){
               
                 let totatQ=(presentList.items[i].quantity)+1
                 let arrP=(presentList.items[i].priceTotal)+p
                 let finalP=presentList.totalPrice+p
                 let totalI=arr.length
                 presentList.items[i].quantity=totatQ
                 presentList.items[i].priceTotal=arrP
                 presentList.totalPrice=finalP
                 presentList.totalitems=totalI
                 presentList.save()
                 return res.status(200).json(presentList)
                }
            }
                    let item={
                        products:data.items[0].products,
                        quantity:1,
                        priceTotal:p 
                    }
                    presentList.items.push(item)
                    presentList.totalPrice=presentList.totalPrice+p
                    presentList.totalitems=arr.length
                
                    presentList.save()
                 return res.status(200).json(presentList)        
            }else{
                let price=name.cost             
   
        
                let product={
                    email:data.email,
                    items:[{
                    products:name.name,
                    quantity:1,
                    priceTotal:price
                    }
                 ],
                totalPrice:price,
                totalitems:1
                }
        let newList= await listModel.create(product)
        return res.status(201).json(newList)

            
        
         } }
    catch (error) {
        return res.status(500).json(error.message)

    }
}

const fetchList = async (req,res)=>{
    try {
        let data =req.body.email
        let userList=await listModel.findOne({data})
        return res.status(200).json(userList)
        
    } catch (error) {
        return res.status(500).json(error.message)     
    }
}
module.exports={fetchProduct,list,fetchList}