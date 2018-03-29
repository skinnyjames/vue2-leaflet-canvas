## vue2leaflet-canvas

A Vue2Leaflet wrapper for @skinnyjames/leaflet-canvas

## usage

```
npm install vue2leaflet-canvas

```

in your app

```html

<v-map ref="map" :zoom="10">
  <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
  <v-canvas-layer
    :locations="locations"
    @l-drawing="drawing"
    @l-mousemove="hover"
    @l-click="click">
  </v-canvas-layer>
</v-map>

```

```javascript

import Vue2Leaflet from 'vue2-leaflet'
import Vue2LeafletCanvas from 'vue2leaflet-canvas'

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-canvas-layer': Vue2LeafletCanvas)

methods: {
  data() {
    // generate an array of locations that have a L.latLng property named "latlng"
    ...
    return {
      locations: locations,
    }
  },
  // use the drawing event to get access to the canvas element
  drawing(info) {
    let canvas = info.canvas
    let ctx = canvas.getContext('2d')
    let mapa = this.$refs.map.mapObject
    let bounds = mapa.getBounds()

    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = "rgb(106, 158, 242)"

    for (let i=0;i<this.locations.length;i++) {
      if (bounds.contains(this.locations[i].latlng)) {
        var dot = mapa.latLngToContainerPoint(this.locations[i].latlng)
        ctx.beginPath() 
        ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
      }  
    }
  },
  // logic for hover
  hover(info) {
    let vm = this
    let container = document.getElementsByClassName('leaflet-container')[0]
    // isMoused has a boolean describing if a location is hovered over
    if (info.isMoused) {
      container.style.cursor = 'crosshair'
    } else {
      container.style.cursor = ''
    }
  },
  // logic for clicks
  click(info) {
    let vm = this
    // clickedLocations will have any clicked location objects
    let points = info.clickedLocations
    if (points[0]) {
      alert(points[0].message)
    }
  },
}

```

## notes

You don't need to pass an array to the locations property, as you'll be drawing on the canvas yourself.
However, the isMoused and clickedLocations properties only work when there are locations with valid latlngs

## develop

```
git clone git@github.com:skinnyjames/vue2leaflet-canvas.git && cd vue2leaflet-canvas
npm install
npm run build
npm run demo
```

