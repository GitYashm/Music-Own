const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingschema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type: String,
        required:true,
        // set is used to set the default value when no value given by the user
    },
   
}) 
const Listing = mongoose.model("Listing",listingschema);
module.exports = Listing;