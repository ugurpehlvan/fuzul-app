import properties from '../data/properties.js';

const getProperties = async (req, res) => {
    const { page } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;
    const paginatedProperties = properties.slice(offset, offset + limit);

    res.json({ properties: paginatedProperties, total: properties.length });
}

const getFilteredProperties = async (req, res) => {
    const { locs, priceRange, propertyType, page } = req.query;

    const limit = 10;
    const offset = (page - 1) * limit;
    
    const filteredProperties = properties.filter(property => {
      const checkLocation = locs ? property?.location?.toLowerCase()?.includes(locs?.toLowerCase()) : true;
      const checkPriceRange = priceRange ? (
        property?.price >= Number(priceRange[0]) && property?.price <= Number(priceRange[1])
      ) : true;
      const checkPropertyType = propertyType ? property?.type?.toLowerCase() === propertyType?.toLowerCase() : true;
    
      return checkLocation && checkPriceRange && checkPropertyType;
    });

    const paginatedProperties = filteredProperties.slice(offset, offset + limit);
  
    res.json({ properties: paginatedProperties, total: filteredProperties.length });
}

export { getProperties, getFilteredProperties };