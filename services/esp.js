const fs = require('fs');


const NODE0 = (0, 0);
const NODE1 = (2.75, 0);

function polarToCartesian(radius, degrees, node) {
  console.log("polarToCartesian");
  radius = 1000;
  var pi = Math.PI;
  var xOffset = 0;
  if (node) {
    xOffset = 2.75
  }
  console.log([(radius * Math.cos(degrees * (pi / 180))) + xOffset, radius * Math.sin(degrees * (pi / 180))]);
  return [(radius * Math.cos(degrees * (pi / 180))) + xOffset, radius * Math.sin(degrees * (pi / 180))]
}

//start end, start end
function lineLineIntersection(A, B, C, D) {
  console.log("testing at beginning")

  // Create vectors for the line segments
  const AB = [B[0] - A[0], B[1] - A[1]];
  const CD = [D[0] - C[0], D[1] - C[1]];

  // Cross product helper function
  function cross(v1, v2) {
    return v1[0] * v2[1] - v1[1] * v2[0];
  }

  // Check if the lines are parallel or coincident
  if (cross(AB, CD) === 0) {
    // Calculate vector from A to C
    const AC = [C[0] - A[0], C[1] - A[1]];

    // Lines are parallel or coincident
    if (cross(AC, AB) === 0) {
      // Lines are coincident
      return null;
    } else {
      // Lines are parallel but not coincident
      return null;
    }
  }

  // Calculate the intersection point
  const denom = cross(AB, CD);
  if (denom === 0) {
    return null;
  }

  const AC = [C[0] - A[0], C[1] - A[1]];
  const t = cross(AC, CD) / denom;
  const u = cross(AC, AB) / denom;

  if (t < 0 || t > 1 || u < 0 || u > 1) {
    return null;
  }

  // Calculate the intersection point
  const intersectionPoint = [
    A[0] + t * AB[0],
    A[1] + t * AB[1]
  ];

  console.log(intersectionPoint + " or maybe null?")
  return intersectionPoint;
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
      if (JSON.stringify(Object.keys(dataJSON)) == JSON.stringify(["0", "1"])) {
        // console.log("got both");
        // console.log(Object.keys(dataJSON["0"]));
        for (let mac in Object.keys(dataJSON["0"])) {
          mac = Object.keys(dataJSON["0"])[mac];
          // console.log(JSON.stringify(dataJSON["0"]))
          var rssi0 = dataJSON["0"][mac].rssi;
          var heading0 = dataJSON["0"][mac].heading;
          var rssi1 = dataJSON["1"][mac].rssi;
          var heading1 = dataJSON["1"][mac].heading;
          // console.log("line0: ", polarToCartesian(rssi0, heading0, 0));
          // console.log("line1: ", polarToCartesian(rssi1, heading1, 1));
          devices.devices[mac] = lineLineIntersection([0, 0], polarToCartesian(rssi0, heading0, 0), [2.75, 0], polarToCartesian(rssi1, heading1, 1));
        }
        // NOTE: HERE IS WHERE YOU EMIT SOCKET TO NOTIFY CLIENT
        // console.log(JSON.stringify(devices));
        fs.writeFileSync("store.json", "{}");
      } else {
        dataString = JSON.stringify(dataJSON);
        fs.writeFileSync("store.json", dataString);
        return {
          status: 200
        }
      }
    } catch (e) {
      console.log(e);
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
