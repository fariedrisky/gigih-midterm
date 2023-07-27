const express = require("express");
const router = express.Router();
const videoThumbModel = require("../models/videos");
const productModel = require("../models/products"); 

router.get('/:videoID', async (req, res) => {
    try {
        const { videoID } = req.params;

        // Find the thumbnail document based on the videoID
        const thumbnail = await videoThumbModel.findOne({ videoID });

        if (!thumbnail) {
            return res.status(404).json({ error: 'Thumbnail not found' });
        }

        // Use the videoID from the thumbnail to find related products
        const products = await productModel.find({ videoID: thumbnail.videoID });

        return res.json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/add', async (req, res) => {
    try {
      const {productID, productLink, title, price, videoID } = req.body;
  
      // Add a new comment document in the database
      const newProduct = new productModel({
        productID, 
        productLink, 
        title, 
        price,
        videoID
      });
  
      // Save the new comment document
      const savedProduct = await newProduct.save();
  
      // Respond with the saved comment
      res.json(savedProduct);
    } catch (error) {
      // In case of an error, handle it at this point and send a response indicating the error.
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to save product.' });
    }
  });

module.exports = router;