var q = {};

function stateFromQueryString() {
  const params = new URLSearchParams(location.search);
  q.z = params.get('z') || 8;
  q.lat = params.get('lat') || 45.1734;
  q.lng = params.get('lng') || 13.5579;
  q.bearing = params.get('bearing') || 0;
  q.pitch = params.get('pitch') || 0;
}

function queryStringFromState(){
  const params = new URLSearchParams(location.search);
  params.set('z', map.getZoom().toFixed(4));
  params.set('lat', map.getCenter().lat.toFixed(4));
  params.set('lng', map.getCenter().lng.toFixed(4));
  (map.getBearing().toFixed(0) == 0.0) ? params.delete('bearing') : params.set('bearing', map.getBearing().toFixed(4));
  (map.getPitch().toFixed(0) == 0.0) ? params.delete('pitch') : params.set('pitch', map.getPitch().toFixed(4));
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

stateFromQueryString();
var map = new mapboxgl.Map({
  container: 'map',
  center: [q.lng, q.lat],
  zoom: q.z,
  bearing: q.bearing,
  pitch: q.pitch,
  minZoom: 2,
  maxZoom: 20,
  style: 'nautical_active.json'
});
map.addControl(new mapboxgl.NavigationControl(), 'top-right');
map.addControl(new mapboxgl.ScaleControl({unit: 'nautical'}), 'bottom-left');

// Manage popups on hover
var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});
map.on('styledata', function (e) {
  var style = map.getStyle();
  style.layers.forEach(function (layer) {
    if (layer['source-layer']) {
      if (layer['source-layer'].match(/^seamark/)) {
        map.on('mouseover', layer.id, function(e) {
          var htmlString;
          if (e.features[0].properties.name) {
            htmlString = 'I am a ' + e.features[0].properties.type + ' named ' + e.features[0].properties.name
          } else {
            htmlString = 'I am an unnamed ' + e.features[0].properties.type
          }
          map.getCanvas().style.cursor = 'pointer';
          popup.setLngLat(e.lngLat)
            .setHTML(htmlString)
            .addTo(map);
        });
        map.on('mouseleave', layer.id, function() {
          map.getCanvas().style.cursor = '';
          popup.remove();
        })
      }
    }
  })

});

// Track state in the console log. @todo: remove
map.on('load', function () {
  queryStringFromState();
  console.log(q);
});
map.on('drag', function () {
  queryStringFromState();
  console.log(q);
});
map.on('zoom', function () {
  queryStringFromState();
  console.log(q);
});
