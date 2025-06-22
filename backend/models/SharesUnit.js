import mongoose from "mongoose";

const SharesUnitSchema = new mongoose.Schema({
  type: { type: String, required: true },
  size: { type: Number, required: true },
  marketPrice: { type: Number, required: true },
  offeredPrice: { type: Number, required: true },
  deliveryDate: { type: Date, required: true },
  noOfShares: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    region: { type: String, required: true },
  },
  locationUrl: { type: String, required: true },
  images: [{ type: String, required: true }],
  videos: [{ type: String, required: true }],
  noOfRooms: { type: Number, required: true },
  noOfBathrooms: { type: Number, required: true },
  users: [
    {
      userId: { type: String },
      shares: { type: Number },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const sharesUnit = mongoose.model("SharesUnit", SharesUnitSchema);

export default sharesUnit;
