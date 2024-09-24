async function getGeoPermission() {
  try {
    const result = await navigator.permissions.query({ name: "geolocation" });
    return `${permission}: ${result.state}`;
  } catch (error) {
    return `${permission} (not supported)`;
  }
}

export default getGeoPermission;
