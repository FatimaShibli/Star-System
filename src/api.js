const fs = require('fs');
const path = require('path');

const ratingsFilePath = path.resolve(__dirname, 'ratings.json');

const getRatings = () => {
  const ratingsData = fs.readFileSync(ratingsFilePath, 'utf-8');
  return JSON.parse(ratingsData).ratings;
};

const saveRating = (rating) => {
  const ratingsData = fs.readFileSync(ratingsFilePath, 'utf-8');
  const ratings = JSON.parse(ratingsData).ratings;
  ratings.push(rating);
  fs.writeFileSync(ratingsFilePath, JSON.stringify({ ratings }));
};

module.exports = { getRatings, saveRating };

const calculateTotalRatings = () => {
    const ratings = getRatings();
    return ratings.length;
  };
  
  module.exports = { getRatings, saveRating, calculateTotalRatings };
  