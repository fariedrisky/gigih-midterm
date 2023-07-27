const express = require("express");
const videoThumbModel = require("../models/videos");
const router = express.Router();

router.get("/", async (_, res) =>{
    const thumbnail = await videoThumbModel.find();
    res.status(200).json(thumbnail);
});

router.post('/add', async (req, res) => {
    try {
      const {videoID, urlImageThumb } = req.body;
  
      // Add a new comment document in the database
      const newThumb = new videoThumbModel({
        videoID,
        urlImageThumb,
      });
  
      // Save the new comment document
      const savedThumb = await newThumb.save();
  
      // Respond with the saved comment
      res.json(savedThumb);
    } catch (error) {
      // In case of an error, handle it at this point and send a response indicating the error.
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Failed to save thumbnail.' });
    }
  });

module.exports = router;