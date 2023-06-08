import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarRating = () => {
  const [controlledRating, setControlledRating] = useState(0);
  const [readOnlyRating, setReadOnlyRating] = useState(0);
  const [disabledRating, setDisabledRating] = useState(0);
  const [noRatingGiven, setNoRatingGiven] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchTotalRatings = async () => {
      try {
        const response = await axios.get('/api/total-ratings');
        setTotalRatings(response.data.totalRatings);
      } catch (error) {
        console.error('Error occurred while fetching total ratings:', error);
      }
    };

    fetchTotalRatings();
  }, []);

  useEffect(() => {
    const calculateAverageRating = () => {
      const sum = ratings.reduce((acc, rating) => acc + rating, 0);
      const average = sum / ratings.length || 0;
      setAverageRating(average.toFixed(1));
    };

    calculateAverageRating();
  }, [ratings]);

  const handleRatingChange = async (newRating, setRating) => {
    setRating(newRating);
    try {
      await axios.post('/api/ratings', { rating: newRating });
      setRatings((prevRatings) => [...prevRatings, newRating]);
      setTotalRatings((prevTotalRatings) => prevTotalRatings + 1);
    } catch (error) {
      console.error('Error occurred while saving the rating:', error);
    }
  };

  return (
    <div>
      <h3>Controlled:</h3>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value, setControlledRating)}
            style={{
              cursor: 'pointer',
              color: value <= controlledRating ? 'orange' : 'gray',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <h4>Your rating: {controlledRating}</h4>

      <h3>Read Only:</h3>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value, setReadOnlyRating)}
            style={{
              cursor: 'pointer',
              color: value <= readOnlyRating ? 'orange' : 'gray',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <h4>Your rating: {readOnlyRating}</h4>

      <h3>Disabled:</h3>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value, setDisabledRating)}
            style={{
              cursor: 'pointer',
              color: value <= disabledRating ? 'orange' : 'gray',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <h4>Your rating: {disabledRating}</h4>

      <h3>No rating given:</h3>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value, setNoRatingGiven)}
            style={{
              cursor: 'pointer',
              color: value <= noRatingGiven ? 'orange' : 'gray',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <h4>Your rating: {noRatingGiven}</h4>

      <h3>Average Rating: {averageRating}</h3>
    </div>
  );
};

export default StarRating;
