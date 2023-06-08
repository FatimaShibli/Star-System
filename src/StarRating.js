import React, { useState, useEffect } from 'react';
import axios from 'axios';



const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
  
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
  
    const handleRatingChange = async (newRating) => {
      setRating(newRating);
      try {
        await axios.post('/api/ratings', { rating: newRating });
        setTotalRatings((prevTotalRatings) => prevTotalRatings + 1);
      } catch (error) {
        console.error('Error occurred while saving the rating:', error);
      }
    };
  
  return (
    <div>
      <h3>Rate this widget:</h3>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value)}
            style={{
              cursor: 'pointer',
              color: value <= rating ? 'orange' : 'gray',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <h3>Your rating: {rating}</h3>
    </div>
  );
  };
  

export default StarRating;
