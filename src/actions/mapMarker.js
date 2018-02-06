export const addMapMarker = (results) => {
    return {
        type: 'ADD_MARKERS',
        locations: results.data
    };
  }