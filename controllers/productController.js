import Product from "../models/products.js";
import { isAdmin } from "./userController.js";

export async function createProduct (req,res) {

    if(! isAdmin(req)){
        return res.status(403).json({
            message : "admins only"
        })
    }
    
    const product = new Product(req.body)

    try{
       const response = await product.save()
       
       res.json({
        message : "product saved successfully",
        product : response
       })

    }catch(e){
        console.log(e)
    }


}

export async function getProducts(req,res){
     try{
         
        if (isAdmin(req)){

            const products = await Product.find();
            return res.json(products);
        }else{
            const products = await Product.find({isAvailable: true})
            return res.json(products)
        }
     }catch(e){

     }
}

export async function deleteProduct(req,res) {

    if(!isAdmin(req)){
         res.status(403).json({
            message: "access denied, admins only"
         })
         return;
    }

    try{
        const productId = req.params.productId

        await Product.deleteOne({
            productId : productId
        })
        res.json({
            message : "product deleted succesfully"
        })

    }catch(e){

    }
    
}

export async function updateProduct(req,res) {

    if(!isAdmin(req)){
        res.status(403).json({
            message:"access denied, admins only"
        })
        return;
    }
    const data =  req.body;
    const productId = req.params.productId
    data.productId = productId

    try{
        await Product.updateOne({
            productId : productId
        },data)

        res.json({message: "product updated successfully"})

    }catch(e){

    }
    
}

export async function getProductInfo(req,res){
    try{
        const productId = req.params.productId
        const product = await Product.find({productId : productId})
        if(product==null){
            res.status.json({
                message: "product not find"
            })
            return;
        }

        if(isAdmin(req)){
           res.json(product)
        }else{
            if(product.isAvailable){
                res.json(product)
            }else{
                res.json({message: "product is not availble"})
            }
        }

    }catch(e){
        console.log(e)
    }
    
}