// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request(`https://api.ipify.org/?format=json`);
};

/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body);
  return request(`http://ipwho.is/${data.ip}`);
};

const fetchISSFlyOverTimes  = function(body) {
  const coords = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = function(){
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response
  });
};

module.exports = { nextISSTimesForMyLocation };