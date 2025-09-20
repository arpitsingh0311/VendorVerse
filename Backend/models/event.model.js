import mongoose from "mongoose";
import User from "./user.model.js";

const eventSchema = new mongoose.Schema({
    host:{
        type: mongoose.Schema.Types.ObjectId,
        req:User,
        required:true,
    },
    eventName:{
        type:String,
        required:true,
        trim:true,
    },
    eventType:{
        type:String,
        required:true,
        default:"Others"
    },
    eventDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    budget:{
        type:Number,
        required:true,
        default:0
    },
    vendors: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['Pending', 'Confirmed', 'Paid'], default: 'Pending' }
    }]
},
{
    timestamps:true,
});

const Event = mongoose.model("Event",eventSchema);
export default Event;