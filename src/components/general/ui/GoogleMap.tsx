'use client'

import { CompanyName } from "@/constants";
import { Autocomplete, GoogleMap, Marker, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { useRef, useState } from "react";

export const GoogleMapComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY as string
  console.log(apiKey)

  const lat = -33.379367338182476;
  const lng = -70.76571012655519;
  const location = { lat, lng }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places", "geometry"]
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

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const inputSearchRef = useRef<HTMLInputElement>(null)

  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)
  const [distance, setDistance] = useState<number | null>(null)

  //TODO: Hacer que esto funcione -> geometry library is undefined
  const handlePlaceChanged = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace()
    if (!place.geometry || !place.geometry.location) return;

    const userCurrentLocation = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }

    setUserLocation(userCurrentLocation)

    const companyLocationObj = new google.maps.LatLng(location.lat, location.lng)
    const userLocationObj = new google.maps.LatLng(userCurrentLocation.lat, userCurrentLocation.lng)

    const mettersCalc = google.maps.geometry.spherical.computeDistanceBetween(
      companyLocationObj, userLocationObj
    )

    setDistance(mettersCalc / 1000) // conver to km
  }


  if (!isLoaded) return <p>Cargando mapa...</p>;

  return (
    <>
      <div className="absolute z-10 top-4 left-20 bg-white shadow-md p-2 rounded-xl w-full max-w-md">
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            ref={inputSearchRef}
            type="text"
            placeholder="Ingresá tu ubicación..."
            className="w-full p-2 rounded-xl ring-0 border-none"
          />
        </Autocomplete>
      </div>

      <GoogleMap
        mapContainerClassName={"w-full h-full"}
        center={location}
        zoom={15}
        options={mapOptions}
      >
        <OverlayView
          position={location}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="flex justify-center items-center translate-x-[-50%] translate-y-[-250%]">
            <p className="font-medium text-sm tracking-wider text-nowrap bg-primaryBlue-400 text-white py-1 px-2 rounded">
              {CompanyName}
            </p>
          </div>
        </OverlayView>
        <Marker
          position={location}
          title={CompanyName}
        />

        {/* user marker */}
        {userLocation && <Marker position={userLocation} />}

        {/* distance between */}
        {userLocation && (
          <OverlayView
            position={userLocation}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="translate-x-[-50%] translate-y-[-150%] bg-blue-100 text-xs font-semibold px-2 py-1 rounded shadow text-blue-800">
              Distancia: {distance?.toFixed(2)} km
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </>
  );
};



