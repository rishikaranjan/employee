import mongoose from "mongoose";


const userSchema = mongoose.Schema(
    {
    
        name: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },

        completeAddress: {

            address: { type: String, required: true },
            lat: { type: Number },
            lng: { type: Number },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            stateName: { type: String, required: true },
            country: { type: String, required: true },
            pincode: { type: Number, required: true },
        
        },

        age: { type: Number, required: true },

        department: { type: String, required: true },

        status: { type: String, required: true },


    }, 


    {
        timestamps: true,
    }

);


const User = mongoose.model('User', userSchema);

export default User;

