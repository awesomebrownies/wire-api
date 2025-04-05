const express = require('express');
const esp = require('../services/esp');
const router = new express.Router();
 
router.post('/send', async (req, res, next) => {
  let options = { 
  };

  options.espPost = req.body;

  try {
    const result = await esp.postSend(options);
    res.status(result.status || 200).send(result.data);
  }
  catch (err) {
    return res.status(500).send({
      error: err || 'Something went wrong.'
    });
  }
});

module.exports = router;