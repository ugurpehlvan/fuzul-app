import React, { useState, useEffect } from "react";

// components
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Pagination,
} from "@mui/material";
import SearchForm from "components/search-form";

// utils
import axios from "axios";

// styles
const styles = {
    card: {
        margin: 8,
    },
};

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleSearchProperties = ({ location, priceRange, propertyType }) => {
        axios.get("/api/properties/search?location", { params: { locs: location, priceRange, propertyType, page } })
            .then(({ data }) => {
                setProperties(data.properties);
                setTotalCount(Math.ceil(data?.total / 10));
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        axios.get("/api/properties",  { params: { page } })
            .then(({ data }) => {
                setProperties(data?.properties);
                setTotalCount(Math.ceil(data?.total / 10));
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [page]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
        Property Search
            </Typography>
            <SearchForm onSearch={handleSearchProperties} />
            <Grid container spacing={2} >
                {properties.map((property) => (
                    <Grid key={property.id} item xs={12} sm={6} md={6}>
                        <Card style={styles.card}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {property.location}
                                </Typography>
                                <Typography color="textSecondary">{`Price: $${property.price.toLocaleString()}`}</Typography>
                                <Typography color="textSecondary">{`Type: ${property.type}`}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">View Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination count={totalCount} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
        </Container>
    );
}