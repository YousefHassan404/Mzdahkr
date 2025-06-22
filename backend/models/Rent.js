import mongoose from 'mongoose';

const RentSchema = new mongoose.Schema({
    type : { type: String, required: true },
    size : { type: Number, required: true },
    marketPrice : { type: Number, required: true },
    offeredPrice : { type: Number, required: true },
    deliveryDate : { type: Date, required: true },
    location :{
        address : { type: String, required: true },
        city : { type: String, required: true },
        region : { type: String, required: true },
    },
    locationUrl : { type: String, required: true },
    images : [{ type: String, required: true }],
    videos : [{ type: String }],
    noOfRooms : { type: Number, required: true },
    noOfBathrooms : { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Rent = mongoose.model('Rent', RentSchema);
  
  export default Rent;