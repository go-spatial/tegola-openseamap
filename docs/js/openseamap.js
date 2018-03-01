var
  map,
  q = {}
;

function getBearing() {
  if (typeof map.getBearing === 'function') {
    return map.getBearing()
  } else {
    return map.getView().getRotation()/(Math.PI/180)
  }
}
function getCenter() {
  if (typeof map.getCenter === 'function') {
    return map.getCenter()
  } else {
    var center = ol.proj.toLonLat(map.getView().getCenter());
    return {'lat': center[1], 'lng': center[0]}
  }
}
function getPitch() {
  if (typeof map.getPitch === 'function') {
    return map.getPitch()
  } else {
    return 0
  }
}
function getZoom() {
  if (typeof map.getBearing === 'function') {
    return map.getZoom()
  } else {
    return map.getView().getZoom()
  }
}

function stateFromQueryString() {
  const params = new URLSearchParams(location.search);
  q.lib = params.get('lib') || 'mapbox';
  q.z = Number.parseFloat(params.get('z')) || 8;
  q.lat = Number.parseFloat(params.get('lat')) || 45.1734;
  q.lng = Number.parseFloat(params.get('lng')) || 13.5579;
  q.bearing = Number.parseFloat(params.get('bearing')) || 0;
  q.pitch = Number.parseFloat(params.get('pitch')) || 0;
}

function queryStringFromState(){
  const params = new URLSearchParams(location.search);
  params.set('lib', q.lib);
  params.set('z', getZoom().toFixed(4));
  params.set('lat', getCenter().lat.toFixed(4));
  params.set('lng', getCenter().lng.toFixed(4));
  (getBearing().toFixed(0) == 0.0) ? params.delete('bearing') : params.set('bearing', getBearing().toFixed(4));
  (getPitch().toFixed(0) == 0.0) ? params.delete('pitch') : params.set('pitch', getPitch().toFixed(4));
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

stateFromQueryString();
if (q.lib === 'mapbox') {
  map = new mapboxgl.Map({
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
          map.on('mouseover', layer.id, function (e) {
            var
              htmlString = '<table class="popup-inspector">',
              everPresent = ['name', 'type']
            ;
            htmlString += '<tr><td  class="key">osm_id:</td><td>' + e.features[0].id + '</td></tr>';
            everPresent.forEach(function (p) {
              htmlString += '<tr><td class="key">' + p + ':</td><td>' + e.features[0].properties[p] + '</td></tr>';
            });
            for (const [k, v] of Object.entries(e.features[0].properties).sort()) {
              if (everPresent.indexOf(k) < 0) {
                if (!(/_category$/).test(k) || (v !== '')) {
                  htmlString += '<tr><td class="key">' + k + ':</td><td>' + v + '</td></tr>';
                }
              }
            }
            htmlString += '</table>';
            map.getCanvas().style.cursor = 'pointer';
            popup.setLngLat(e.lngLat)
              .setHTML(htmlString)
              .addTo(map);
          });
          map.on('mouseleave', layer.id, function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
          })
        }
      }
    })
  });

  map.on('load', function () {
    queryStringFromState();
  });
  map.on('drag', function () {
    queryStringFromState();
  });
  map.on('zoom', function () {
    queryStringFromState();
  });
}
else {
  map = new ol.Map({
    target: 'map',
    view: new ol.View({
      center: ol.proj.fromLonLat([q.lng, q.lat]),
      zoom: q.z,
      rotation: q.bearing * (Math.PI/180),
      minZoom: 2,
      maxZoom: 20,
    })
  });
  olms.apply('map', '/nautical_active.json');
  map.on('postrender', function () {
    queryStringFromState();
  });
  console.log('exiting ol with properties:', map.getProperties());
}
