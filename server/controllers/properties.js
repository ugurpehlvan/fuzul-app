import properties from '../data/properties.json' assert { type: "json" };

const getProperties = async (req, res) => {
    res.json(properties);
}

const getFilteredProperties = async (req, res) => {
    const { location, priceRange, propertyType } = req.query;
    
    const filteredProperties = properties.filter(property => {
      return (
        property.location.includes(location) &&
        property.price >= priceRange[0] &&
        property.price <= priceRange[1] &&
        property.type === propertyType
      );
    });
  
    res.json(filteredProperties);
}

export { getProperties, getFilteredProperties };