const { io } = require('../server.js');

module.exports = {
  /**
   * @param options.testPost.devices
   * @param options.testPost.id
   */
  postSend: async (options) => {
    console.log(">> postSend triggered with options:", JSON.stringify(options));
    let responseData = { success: true };
    
    try {
      // Emit the event to all connected clients
      io.emit('position_update', options.testPost);
      console.log("Emitted position_update event with data:", JSON.stringify(options));
    } catch(e) {
      console.error("Socket emission error:", e);
      responseData = { success: false, error: e.message };
    }
    
    return {
      status: 200,
      data: responseData
    };
  },
};