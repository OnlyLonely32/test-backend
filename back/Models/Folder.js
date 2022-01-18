import  mongoose  from "mongoose";

const Folder = new mongoose.Schema( {
    name: {type: String, required: true},
})

export default mongoose.model('Folder', Folder)