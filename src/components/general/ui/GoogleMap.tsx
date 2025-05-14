'use client'

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export const GoogleMapComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY as string

  const lat = -34.6037;
  const lng = -58.3816;
  const location = { lat, lng }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true, // delete all controllers
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    draggable: true,
    scrollwheel: false,
    keyboardShortcuts: false,
  };

  if (!isLoaded) return <p>Cargando mapa...</p>;

  return (
    <GoogleMap
      mapContainerClassName={"w-full h-full"}
      center={location}
      zoom={15}
      options={mapOptions}
    >
      <Marker position={location} />
    </GoogleMap>
  );
};
