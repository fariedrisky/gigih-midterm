const express = require("express");
const router = express.Router();
const videoThumbModel = require("../models/videos");
const commentModel = require("../models/comments"); 

router.get('/:videoID', async (req, res) => {
    try {
        const { videoID } = req.params;

        // Find the thumbnail document based on the videoID
        const thumbnail = await videoThumbModel.findOne({ videoID });

        if (!thumbnail) {
            return res.status(404).json({ error: 'Thumbnail not found' });
        }

        // Use the videoID from the thumbnail to find related coomments
        const comments = await commentModel.find({ videoID: thumbnail.videoID });

        return res.json(comments);
    } catch (error) {
        console.error('Error retrieving comment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
      const { username, comment, videoID} = req.body;
  
      // Add a new comment document in the database
      const newComment = new commentModel({
        username,
        comment,
        videoID,
      });
  
      // Save the new comment document
      const savedComment = await newComment.save();
  
      // Respond with the saved comment
      res.json(savedComment);
    } catch (error) {
      // In case of an error, handle it at this point and send a response indicating the error.
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Failed to save comment.' });
    }
  });

module.exports = router;