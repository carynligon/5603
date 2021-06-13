export const getLatLangFromAddress = async (address: string | string[]) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=$${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  const responseJSON = await response.json();
  return responseJSON.results[0].geometry.location;
};
