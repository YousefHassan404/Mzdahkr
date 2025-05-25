import express from "express";
const RequestRouter = express.Router();
import Request from "../models/Request.js";
import authenticateUser from "../middlewares/userAuth.js";

// Register new request
RequestRouter.post("/", authenticateUser, async (req, res) => {
  const { desiredUnitType, desiredLocation, budget, area, notes } = req.body;

  // Check if required fields are provided
  if (!desiredUnitType || !desiredLocation || !budget || !area) {
    return res.status(400).json({ message: "All required fields must be provided" });
  }

  try {
    // Create a new request object
    const newRequest = new Request({
      desiredUnitType,
      desiredLocation,
      budget,
      area,
      notes,
      userId: req.user._id,  // Associate the request with the authenticated user
    });

    // Save the request to the database
    await newRequest.save();

    // Send success response
    res.status(201).json({
      message: "Request created successfully",
      data: newRequest,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the request", error: error.message });
  }
});

export default RequestRouter;