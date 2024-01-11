import React, { useState, useEffect } from 'react';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantImages, setRestaurantImages] = useState({});

  useEffect(() => {
    // Fetch restaurant details
    fetch('https://userpanel.selfeey.com/api.selfeey.com/restaurantsapi/getrestaurantlist.php')
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
        fetchRestaurantImages(data);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
      });
  }, []);

  const fetchRestaurantImages = (restaurants) => {
    const imagePromises = restaurants.map(restaurant =>
      fetch(`https://userpanel.selfeey.com/api.selfeey.com/newapi.php?id=${restaurant.restaurant_id}`)
        .then(response => response.json())
        .then(images => ({
          restaurantId: restaurant.restaurant_id,
          imageUrl: images.length > 0 ? `https://api.selfeey.com/restaurantsapi/${images[0].image_path}` : null
        }))
    );

    Promise.all(imagePromises)
      .then(imageData => {
        const imagesObj = {};
        imageData.forEach(({ restaurantId, imageUrl }) => {
          imagesObj[restaurantId] = imageUrl;
        });
        setRestaurantImages(imagesObj);
      })
      .catch(error => {
        console.error('Error fetching restaurant images:', error);
      });
  };

  return (
    <div className="restaurant-container">
      <h1>Restaurant List</h1>
      <div className="grid-container">
        {restaurants.map(restaurant => (
          <div key={restaurant.restaurant_id} className="restaurant-card">
            <h2>{restaurant.restaurant_name}</h2>
            <p>Location: {restaurant.restaurant_location}</p>
            <div className="image-gallery">
              {restaurantImages[restaurant.restaurant_id] && (
                <img
                  src={restaurantImages[restaurant.restaurant_id]}
                  alt={`Image for ${restaurant.restaurant_name}`}
                  className="restaurant-image"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default RestaurantList;
