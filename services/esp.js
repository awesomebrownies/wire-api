const fs = require('fs');


const NODE0 = (0, 0);
const NODE1 = (2.75, 0);

function polarToCartesian(radius, degrees, node) {
  radius = 1000;
  var pi = Math.PI;
  var xOffset = 0;
  if (node) {
    xOffset = 2.75
  }
  return [(radius * Math.cos(degrees * (pi / 180))) + xOffset, radius * Math.sin(degrees * (pi / 180))]
}


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Method used to display X and Y coordinates
  // of a point

}

function lineLineIntersection(A, B, C, D) {
  // Line AB represented as a1x + b1y = c1
  var a1 = B[1] - A[1];
  var b1 = A[0] - B[0];
  var c1 = a1 * (A[0]) + b1 * (A[1]);

  // Line CD represented as a2x + b2y = c2
  var a2 = D[1] - C[1];
  var b2 = C[0] - D[0];
  var c2 = a2 * (C[0]) + b2 * (C[1]);

  var determinant = a1 * b2 - a2 * b1;

  if (determinant == 0) {
    // The lines are parallel. This is simplified
    // by returning a pair of FLT_MAX
    var returnVal = new Point(Number.MAX_VALUE, Number.MAX_VALUE);

    return `${returnVal.x}, ${returnVal.y}`;
  }

  else {
    var x = (b2 * c1 - b1 * c2) / determinant;
    var y = (a1 * c2 - a2 * c1) / determinant;
    var returnVal = new Point(x, y);

    return `${returnVal.x}, ${returnVal.y}`;
  }
}






module.exports = {
  /**
  * 

  * @param options.espPost.devices
  * @param options.espPost.id

  */
  postSend: async (options) => {

    console.log(options.espPost);
    var data = fs.readFileSync("store.json");

    var dataJSON = JSON.parse(data);

    dataJSON[options.espPost.id] = options.espPost.devices;

    var devices = {
      "devices": {

      }
    }

    try {
      if (Object.keys(dataJSON) == ["0", "1"]) {
        for (const mac in Object.keys(dataJSON["0"])) {
          var rssi0 = dataJSON["0"][mac].rssi;
          var heading0 = dataJSON["0"][mac].heading;
          var rssi1 = dataJSON["1"][mac].rssi;
          var heading1 = dataJSON["1"][mac].heading;
          devices.devices[mac] = lineLineIntersection([0, 0], polarToCartesian(rssi0, heading0, 0), [2.75, 0], polarToCartesian(rssi1, heading1, 1));
        }
        fs.writeFileSync("store.json", "{}");
      } else {
        dataString = JSON.stringify(dataJSON);
        fs.writeFileSync("store.json", dataString);
        return {
          status: 200
        }
      }
    } catch (e) {
      dataString = JSON.stringify(dataJSON);
      fs.writeFileSync("store.json", dataString);
      return {
        status: 200
      }

    }



    // Implement your business logic here...
    //
    // Return all 2xx and 4xx as follows:
    //
    // return {
    //   status: 'statusCode',
    //   data: 'response'
    // }

    // If an error happens during your business logic implementation,
    // you can throw it as follows:
    //
    // throw new Error('<Error message>'); // this will result in a 500

    var data = {},
      status = '200';

    return {
      status: status,
      data: data
    };
  },
};
