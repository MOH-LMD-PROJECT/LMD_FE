import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

const CustomMap: React.FC = () => {
    const [selectedMarker, setSelectedMarker] = useState<any | null>(null);

    const placesInUganda = [
        { id: 1, name: 'Kampala', position: { lat: 0.3136, lng: 32.5811 }, description: 'Capital city of Uganda' },
        { id: 2, name: 'Jinja', position: { lat: 0.4244, lng: 33.2022 }, description: 'Famous for the source of the Nile' },
        { id: 3, name: 'Entebbe', position: { lat: 0.0567, lng: 32.4799 }, description: 'Home to the Entebbe International Airport' },
        { id: 4, name: 'Mbarara', position: { lat: -0.6092, lng: 30.6460 }, description: 'Largest city in Western Uganda' },
        // Add more places here
        { id: 5, name: 'Gulu', position: { lat: 2.7669, lng: 32.3057 }, description: 'Largest city in Northern Uganda' },
        { id: 6, name: 'Mbale', position: { lat: 1.0649, lng: 34.1797 }, description: 'Located on the slopes of Mount Elgon' },
        { id: 7, name: 'Fort Portal', position: { lat: 0.6933, lng: 30.2750 }, description: 'Known for its stunning landscapes' },
        { id: 8, name: 'Arua', position: { lat: 3.0228, lng: 30.9115 }, description: 'Capital of Arua District' },
        { id: 9, name: 'Masaka', position: { lat: -0.3313, lng: 31.7349 }, description: 'Located in the southwestern region' },
        { id: 10, name: 'Lira', position: { lat: 2.2484, lng: 32.8997 }, description: 'Major town in Northern Uganda' },
        { id: 11, name: 'Soroti', position: { lat: 1.7122, lng: 33.6229 }, description: 'Known for its educational institutions' },
        { id: 12, name: 'Arua', position: { lat: 3.0201, lng: 30.9117 }, description: 'Located in the West Nile region' },
        { id: 13, name: 'Hoima', position: { lat: 1.4356, lng: 31.3436 }, description: 'Known for oil exploration' },
        { id: 14, name: 'Kasese', position: { lat: 0.1736, lng: 30.0863 }, description: 'Gateway to the Rwenzori Mountains' },
        { id: 15, name: 'Tororo', position: { lat: 0.6914, lng: 34.1830 }, description: 'Located in Eastern Uganda' },
        { id: 16, name: 'Moroto', position: { lat: 2.5371, lng: 34.6621 }, description: 'Capital of Moroto District' },
        { id: 17, name: 'Mityana', position: { lat: 0.4175, lng: 32.0228 }, description: 'Known for its agricultural activities' },
        { id: 18, name: 'Kitgum', position: { lat: 3.2783, lng: 32.8864 }, description: 'Located in Northern Uganda' },
        { id: 19, name: 'Kisoro', position: { lat: -1.3546, lng: 29.6995 }, description: 'Near the border with Rwanda and DR Congo' },
        { id: 20, name: 'Pakwach', position: { lat: 2.4689, lng: 31.4821 }, description: 'Located in the West Nile region' },
    ];



    const mapContainerStyle = {
        width: '100%',
        height: '650px',
    };

    const center = {
        lat: 1.3733, // Center the map on Uganda
        lng: 32.2903,
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyD4xdglrWPfIFZ5Of7LzaGMAZ7y4poW3-o">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={7}
                center={center}
            >
                {placesInUganda.map(place => (
                    <Marker
                        key={place.id}
                        position={place.position}
                        onClick={() => setSelectedMarker(place)}
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', // URL to the red marker icon
                        }}
                    />
                ))}

                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker.position}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div>
                            <h2>{selectedMarker.name}</h2>
                            <p>{selectedMarker.description}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default CustomMap;
