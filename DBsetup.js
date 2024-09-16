const mongose=require('mongoose');

mongose.connect("mongodb://127.0.0.1:27017/users");

const userschema=new mongose.Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true,
            unique: true
        }
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
})

module.exports=mongose.model("users",userschema)

