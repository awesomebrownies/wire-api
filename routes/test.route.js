const express = require('express');
const esp = require('../services/test');
const router = new express.Router();
 
router.post('/send', async (req, res, next) => {
  console.log('>> /test/send HIT');
  let options = { 
  };

  options.testPost = req.body;

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