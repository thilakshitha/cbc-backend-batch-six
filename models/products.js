import mongoose from "mongoose"

// products schema 

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    altNames : {
        type : [String],
        default : []
    },
    labelledPrice : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    images : {
        type : [String],
        default : ["/default-product.png"]
    },
    description : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        required : true,
        default : 0
    },
    isAvailable : {
        type : Boolean,
        default : true
    },
    category : {
        type : String,
        default : "cosmatics"
    }

})

//products model
const Product = mongoose.model("product",productSchema)
export default Product

