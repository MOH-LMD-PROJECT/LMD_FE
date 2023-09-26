import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';

const CustomMap: React.FC = () => {
    const [selectedMarker, setSelectedMarker] = useState<any | null>(null);

    // Sample data for markers in Uganda
    const placesInUganda = [
        { id: 1, name: 'Kampala', position: { lat: 0.3136, lng: 32.5811 }, description: 'Capital city of Uganda' },
        { id: 2, name: 'Jinja', position: { lat: 0.4244, lng: 33.2022 }, description: 'Famous for the source of the Nile' },
        // Add more places as needed
    ];

    const mapContainerStyle = {
        width: '100%',
        height: '500px',
    };

    const center = {
        lat: 1.3733, // Center the map on Uganda
        lng: 32.2903,
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyA0NFvPyBdg80YBToXcMCxhQVcUc4-u3x8">
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
