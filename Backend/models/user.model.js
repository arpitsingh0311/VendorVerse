import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            maxLength:32,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            minLength:5,
            trim:true,
        },
        role:{
            type:String,
            enum:["host","vendor","admin"],
            default:"vendor",
            required:true,
        },
        vendorProfile:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"VendorProfile",
        }
    },{
        timestamps:true,
    }
);

userSchema.pre('save', async (next) =>{
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

const User = mongoose.model("User",userSchema);
export default User;