'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { CompanyCoords, CompanyName } from '@/features/home';

export const GoogleMapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  if (!apiKey) throw new Error("the enviroment variable: NEXT_PUBLIC_MAPS_API_KEY not exist");

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey,
        version: 'quarterly',
        libraries: ["maps", "marker", "places"]
      })

      const { Map } = await loader.importLibrary("maps")

      const companyLocation = CompanyCoords
      const options: google.maps.MapOptions = {
        center: companyLocation,
        mapId: "company-location",
        zoom: 15,
        disableDefaultUI: true, // delete all controllers
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        draggable: true,
        scrollwheel: false,
        keyboardShortcuts: false,
      }

      // config maps with options and using ref
      const map = new Map(mapRef.current as HTMLElement, options)

      // Marker
      const { AdvancedMarkerElement } = await loader.importLibrary("marker") as google.maps.MarkerLibrary

      new AdvancedMarkerElement({
        map,
        position: CompanyCoords,
        title: CompanyName,
      })

      // when the user clicked the map, redirect to google maps and show his location respect the company
      map.addListener('click', () => {
        if (!navigator.geolocation) {
          alert("Tu navegador no soporta geolocalización");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            const destination = `${CompanyCoords.lat},${CompanyCoords.lng}`;
            const origin = `${userLat},${userLng}`;
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

            window.open(mapsUrl, '_blank');
          },
          () => {
            alert("No se pudo obtener tu ubicación.");
          }
        );
      });

      // overlay with company name
      class CustomOverlay extends google.maps.OverlayView {
        div: HTMLDivElement | null = null;

        onAdd() {
          this.div = document.createElement('div');
          this.div.style.position = 'absolute';
          this.div.className = 'flex justify-center items-center translate-x-[-50%] translate-y-[-250%]';

          this.div.innerHTML = `
            <p class="font-medium text-sm tracking-wider whitespace-nowrap bg-primaryBlue-400 text-white py-1 px-2 rounded">
              ${CompanyName}
            </p>
          `;

          const panes = this.getPanes();
          panes?.overlayMouseTarget.appendChild(this.div);
        }

        draw() {
          if (!this.div) return;

          const projection = this.getProjection();
          const position = projection.fromLatLngToDivPixel(CompanyCoords);
          if (position) {
            this.div.style.left = `${position.x}px`;
            this.div.style.top = `${position.y}px`;
          }
        }

        onRemove() {
          if (this.div?.parentNode) {
            this.div.parentNode.removeChild(this.div);
          }
          this.div = null;
        }
      }

      // add overlay to map
      const overlay = new CustomOverlay();
      overlay.setMap(map);
    }

    initMap()
  }, [apiKey])

  return <div ref={mapRef} className="w-full h-full" />;
};
