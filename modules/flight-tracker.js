export function initFlightTracker() {
  const mapContainer = document.getElementById('flightTrackerMap');
  if (!mapContainer) return;

  // Load required libraries dynamically
  Promise.all([
    import('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'),
    import('https://unpkg.com/flightradarapi-client@latest/dist/fr24.min.js')
  ]).then(([L, FR24]) => {
    // Initialize map
    const map = L.map(mapContainer).setView([51.505, -0.09], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Fetch flight data
    FR24.getFlights()
      .then(flights => {
        flights.forEach(flight => {
          L.marker([flight.latitude, flight.longitude])
            .bindPopup(`Flight ${flight.callsign}`)
            .addTo(map);
        });
      });
  });
}
