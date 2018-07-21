const map = new mapboxgl.Map({
  container: 'map',
  // YOU CAN CHANGE THIS TO ANY MAPUTNIK OUTPUT FILE
  style: 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
  center: [-75.6590,45.3971],
  zoom: 9
})

const nav = new mapboxgl.NavigationControl()
// TODO: Change to the EC2 instance when tegola is deployed
const instance = 'http://localhost:8080'

const setupMap = () => {
  map.addSource('tracts', {
    type: 'vector',
    tiles: [`${instance}/maps/ottawa_wards/{z}/{x}/{y}.vector.pbf?`],
    tolerance: 0
  })

  map.addLayer({
    id: 'ottawa_wards',
    source: 'tracts',
    'source-layer': 'ottawa_wards',
    type: 'line',
    paint: {
      'line-color': '#FF0000',
      'line-width': 2
    }
  }, 'building')

  map.addLayer({
    id: 'ottawa_wards_fill',
    source: 'tracts',
    'source-layer': 'ottawa_wards',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'ward_num',
        stops: [
          [0, '#edf8fb'],
          [1, '#b2e2e2'],
          [2, '#66c2a4'],
          [3, '#238b45'],
          [4, 'red'],
          [5, 'blue'],
          [6, 'orange'],
          [7, 'pink'],
          [8, '#238b45'],
          [9, '#238b45'],
          [10, '#238b45'],
          [11, '#238b45'],
        ]
      },
      'fill-opacity': 0.5
    }
  }, 'ottawa_wards')
}

// Map Actions
map.addControl(nav, 'top-right')
map.on('load', setupMap)
map.on('click', 'ottawa_wards_fill', console.log)
