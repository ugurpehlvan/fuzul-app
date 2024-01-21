import properties from '../data/properties.js';

const getProperties = async (req, res) => {
    res.json(properties);
}

const getFilteredProperties = async (req, res) => {
    const { locs, priceRange, propertyType } = req.query;
    
    if (!locs && !priceRange && !propertyType) {
      res.json(properties);
      return;
    }

    const filteredProperties = properties.filter(property => {
      return (
        property?.location?.toLowerCase()?.includes(locs?.toLowerCase()) &&
        property?.price >= Number(priceRange[0]) &&
        property?.price <= Number(priceRange[1]) &&
        property?.type?.toLowerCase() === propertyType?.toLowerCase()
      );
    });
  
    res.json(filteredProperties);
}

export { getProperties, getFilteredProperties };