'use client'

import { CompanyCoords, CompanyName } from "@/constants";
import { GoogleMap, Marker, OverlayView, useJsApiLoader } from "@react-google-maps/api";

export const GoogleMapComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY as string ?? 'google-maps key not found'

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
      center={CompanyCoords}
      zoom={15}
      options={mapOptions}
    >
      <OverlayView
        position={CompanyCoords}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div className="flex justify-center items-center translate-x-[-50%] translate-y-[-250%]">
          <p className="font-medium text-sm tracking-wider text-nowrap bg-primaryBlue-400 text-white py-1 px-2 rounded">
            {CompanyName}
          </p>
        </div>
      </OverlayView>
      <Marker
        position={CompanyCoords}
        title={CompanyName}
      />
    </GoogleMap>
  );
};



