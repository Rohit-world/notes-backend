const mongoose=require("mongoose")

const noteScema=mongoose.Schema({
    title:{type:String,isrequired:true},
    tasks:{type :Array},
    date: {type: Date, default: Date.now },
    userID:String
})

const NoteModel=mongoose.model("notes",noteScema)
module.exports={NoteModel}