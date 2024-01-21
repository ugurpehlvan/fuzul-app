import React, { useState, useEffect } from 'react';

// components
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';
import { makeStyles } from "@mui/styles";

import SearchForm from '../components/search-form';

// utils
import axios from 'axios';

// styles
const useStyles = makeStyles((theme) => ({
  card: {
    margin: 8,
  },
}));

export default function Properties() {
  const classes = useStyles();
    const [properties, setProperties] = useState([]);

    const handleSearchProperties = ({ location, priceRange, propertyType }) => {
      if (!location && !priceRange && !propertyType) {
        alert('Please enter a search query!');
        return;
      }

      axios.get('/api/properties/search?location', { params: { locs: location, priceRange, propertyType } })
          .then(({ data }) => {
              setProperties(data);
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
    <Container>
       <Typography variant="h4" gutterBottom>
        Property Search
      </Typography>
      <SearchForm onSearch={handleSearchProperties} />
       <Grid container spacing={2} >
        {properties.map((property) => (
          <Grid key={property.id} item xs={12} sm={6} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {property.location}
                </Typography>
                <Typography color="textSecondary">{`Price: $${property.price.toLocaleString()}`}</Typography>
                <Typography color="textSecondary">{`Type: ${property.type}`}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};