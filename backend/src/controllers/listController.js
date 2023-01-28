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
        let{userName,items}=data
        let pname=data.items[0].productName
 
            let name= await adminModel.findOne({pname})
            let presentList=await listModel.findOne({userName})
            if(presentList){
                let p=name.cost
                
                if(data.items[0].quantity=="500g"){
                     p=(name.cost)*2
                }
                if(data.items[0].quantity=="1kg"){
                     p=(name.cost)*4
                }
                if(data.items[0].quantity=="3kg"){
                     p=(name.cost)*12
                }
                if(data.items[0].quantity=="5kg"){
                    p=(name.cost)*20
                }
             let arr= presentList.items
             let adminP=name.name

             for(i = 0; i < arr.length; i++){
                let listP=presentList.items[i].products
                if(adminP==listP){
                 let totatQ=(presentList.items[i].quantity)+(data.items[0].quantity)
                 let arrP=(presentList.items[i].priceTotal)+p
                 let finalP=presentList.totalPrice+p
                 let totalI=arr.length
                 let obj={
                    items:[{
                        products:listP,
                        quantity:totatQ,
                        priceTotal:arrP
                    }],
                    totalPrice:finalP,
                    totalitems:totalI
                 }
                 let updateSame= await listModel.updateOne({userName},obj,{new:true})
                 return res.status(200).json(updateSame)
                }
                // else{
                //     let item={
                //         products:data.items[0].products,
                //         quantity:data.quantity,
                //         priceTotal:p 
                //     }
                //     presentList.items.push(item)
                //     presentList.totalPrice=presentList.totalPrice+p
                //     totalitems=presentList.items.length
                
                //     presentList.save()
                //  return res.status(200).json(presentList)   

                // }

             }   
            }else{
                let price=name.cost             
   
                let p=price
                
                if(data.items[0].quantity=="500g"){
                     p=price*2
                }
                if(data.items[0].quantity=="1kg"){
                     p=price*4
                }
                if(data.items[0].quantity=="3kg"){
                     p=price*12
                }
                if(data.items[0].quantity=="5kg"){
                    p=price*20
                }
                let product={
                    userName:data.userName,
                    items:[{
                    products:name.name,
                    quantity:data.items[0].quantity,
                    priceTotal:p
                    }
                 ],
                totalPrice:p,
                totalitems:1
                }
        let newList= await listModel.create(product)
        return res.status(201).json(newList)

            
        
         } }
    catch (error) {
        return res.status(500).json(error.message)

    }
}

module.exports={fetchProduct,list}