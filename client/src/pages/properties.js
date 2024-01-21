import React, { useState, useEffect } from 'react';

// utils
import axios from 'axios';

export default function Properties() {
    const [properties, setProperties] = useState([]);

    const handlePropertiesFilter = () => {
        axios.get('/api/properties/search?location=City&priceRange=10,500000&propertyType=Apartment')
            .then(({ data }) => {
              console.log("data", data);
                // setProperties(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }


  useEffect(() => {
    axios.get('/api/properties')
      .then(({ data }) => {
        setProperties(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Property List</h2>
      <button onClick={handlePropertiesFilter}>Filter</button>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            {property.location} - ${property.price} - {property.type}
          </li>
        ))}
      </ul>
    </div>
  );
};