const rad2degr = rad => {
    return (rad * 180) / Math.PI;
};

const degr2rad = degr => {
    return (degr * Math.PI) / 180;
};

export const getLatLngCenter = properties => {
    const LATIDX = 1;
    const LNGIDX = 0;
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;

    const latLngInDegr = properties.map(property => {
        return property.location;
    });

    for (let i = 0; i < latLngInDegr.length; i++) {
        const lat = degr2rad(latLngInDegr[i][LATIDX]);
        const lng = degr2rad(latLngInDegr[i][LNGIDX]);
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }

    const avgX = sumX / latLngInDegr.length;
    const avgY = sumY / latLngInDegr.length;
    const avgZ = sumZ / latLngInDegr.length;

    // convert average x, y, z coordinate to latitude and longtitude
    const lng = Math.atan2(avgY, avgX);
    const hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    const lat = Math.atan2(avgZ, hyp);

    return !isNaN(rad2degr(lat)) && !isNaN(rad2degr(lng))
        ? [rad2degr(lat), rad2degr(lng)]
        : [];
};
