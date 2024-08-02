const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/contactSchema.js");

const Mongo_URL = "mongodb+srv://yash571w1:Yash123@cluster0.vajj4kd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main()
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect((Mongo_URL));
}

 const initdb = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data is initiallized");
}
initdb();
