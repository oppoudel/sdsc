//Get lat, long using geolocation API
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export const getGeolocation = callback => {
  window.navigator.geolocation.getCurrentPosition(
    pos => callback([pos.coords.longitude, pos.coords.latitude]),
    err => console.warn(err.message),
    options
  );
};
