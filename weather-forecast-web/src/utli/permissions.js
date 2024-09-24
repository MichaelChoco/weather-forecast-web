async function GetGeoPermission() {
  try {
    const result = await navigator.permissions.query({ name: "geolocation" });
    return result.state;
  } catch (error) {
    return `${permission} (not supported)`;
  }
}

export default GetGeoPermission;
