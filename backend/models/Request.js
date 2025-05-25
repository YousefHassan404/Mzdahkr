import mongoose from 'mongoose';
  
const RequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    desiredUnitType: { type: String, required: true },
    desiredLocation: { type: String, required: true },
    budget: { type: Number, required: true },
    area: { type: Number, required: true },
    notes : { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Request = mongoose.model('Request', RequestSchema);
  
  export default Request;