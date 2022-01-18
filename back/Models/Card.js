import  mongoose from "mongoose";

const Card = new mongoose.Schema( {
    word: {type: String, required: true},
    translate: {type: String, required: true},
    folder: {type: mongoose.ObjectId, ref: "Foler"}
})

export default mongoose.model('Card', Card)