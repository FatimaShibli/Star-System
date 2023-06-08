import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StarRating = () => {
  const [controlledRating, setControlledRating] = useState(0);
  const [readOnlyRating, setReadOnlyRating] = useState(0);
  const [disabledRating, setDisabledRating] = useState(0);
  const [noRatingGiven, setNoRatingGiven] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [ratings, setRatings] = useState([]); // New state for ratings
  const [averageRating, setAverageRating] = useState(0); // State for average rating

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
      const sum =
        controlledRating * (controlledRating > 0 ? 1 : 0) +
        readOnlyRating * (readOnlyRating > 0 ? 1 : 0) +
        disabledRating * (disabledRating > 0 ? 1 : 0) +
        noRatingGiven * (noRatingGiven > 0 ? 1 : 0);

      const count =
        (controlledRating > 0 ? 1 : 0) +
        (readOnlyRating > 0 ? 1 : 0) +
        (disabledRating > 0 ? 1 : 0) +
        (noRatingGiven > 0 ? 1 : 0);

      const average = sum / count || 0;
      setAverageRating(average.toFixed(1));
    };

    calculateAverageRating();
  }, [controlledRating, readOnlyRating, disabledRating, noRatingGiven]);

  const handleRatingChange = async (newRating, setRating, ratingType) => {
    setRating(newRating);
    try {
      await axios.post('/api/ratings', { rating: newRating });
      setRatings((prevRatings) => [...prevRatings, { rating: newRating, type: ratingType }]);
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

      <h3>Average of ratings: {averageRating}</h3>
    </div>
  );
};

export default StarRating;
