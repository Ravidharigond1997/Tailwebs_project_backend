import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true,
    },
    password: {
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum:["teacher", "student"]
    }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

export default mongoose.model("User", UserSchema)