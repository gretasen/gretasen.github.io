//Inicijuojamas žemėlapis su MapLibre GL JS
var map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://basemap.biip.lt/styles/positron/style.json', // style URL
    center: [25.2643, 54.6927], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

map.addControl(new maplibregl.NavigationControl({
    visualizePitch: true,
    visualizeRoll: true,
    showZoom: true,
    showCompass: true
}),
);

map.on("load", async () => {
    // Add an image to use as a custom marker
    const image = await map.loadImage(
      "https://maplibre.org/maplibre-gl-js/docs/assets/osgeo-logo.png"
    );
  
    map.addImage("custom-marker", image.data);
  
    // Add a GeoJSON source with 15 points
    map.addSource("vilnius_transport", {
      type: "geojson",
      data: "data/vilnius_transport.geojson",
    });
  
    // Add a symbol layer
    map.addLayer({
      id: "vilnius_transport-layer",
      type: "circle",
      source: "vilnius_transport",
      paint: {
        "circle-color": ["get", "color"],
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#FFFFFF"
    },
    });
    map.on('click', "vilnius_transport-layer", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = 
        "<b>" + e.features[0].properties.Transportas + 
        "</b><br>" +
        " " + 
        e.features[0].properties.Marsrutas +
        " " + 
        e.features[0].properties.KryptiesPavadinimas;


        new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });
  });
  