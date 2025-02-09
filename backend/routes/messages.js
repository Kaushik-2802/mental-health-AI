const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Route to save message and process it
router.post("/add", async (req, res) => {
  const { msg } = req.body;
  const newMessage = new Message({ msg });

  try {
    // Save the message to the database
    await newMessage.save();

    // Process the message (call your model here if needed)
    const responseMessage = "This is a placeholder for the model response"; // Replace with your actual model processing logic

    // Send the response back to the client
    res.status(200).json({ response_message: responseMessage });
  } catch (err) {
    res.status(500).send("Error saving message");
  }
});

module.exports = router;
