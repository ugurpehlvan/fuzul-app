import React, { useState } from "react";
import PropTypes from "prop-types";

// components
import { TextField, Slider, Select, MenuItem, Button, FormControl, InputLabel, Grid } from "@mui/material";

const PropertySearchForm = ({ onSearch }) => {
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [propertyType, setPropertyType] = useState("");

    const handleSearch = () => {
        onSearch({ location, priceRange, propertyType });
    };

    const marks = [
        {
            value: 0,
            label: "0",
        },
        {
            value: 1000000,
            label: "1.000.000",
        },
    ];

    function valuetext(value) {
        return `${value}°C`;
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel id="property-type-label">Property Type</InputLabel>
                    <Select
                        label="Property Type"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                    >
                        <MenuItem value="apartment">Apartment</MenuItem>
                        <MenuItem value="house">House</MenuItem>
                        <MenuItem value="flat">Flat</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <div>
                    <InputLabel id="price-range-label">Price Range</InputLabel>
                    <Slider
                        value={priceRange}
                        onChange={(event, newValue) => setPriceRange(newValue)}
                        valueLabelDisplay="on"
                        min={0}
                        max={1000000}
                        getAriaValueText={valuetext}
                        step={1000}
                        marks={marks}
                    />
                </div>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Button style={{ width: "100%" }} variant="contained" color="primary" onClick={handleSearch}>
          Search
                </Button>
            </Grid>
        </Grid>
    );
};

PropertySearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
};


export default PropertySearchForm;