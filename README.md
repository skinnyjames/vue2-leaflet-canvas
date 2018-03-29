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
    if (isMoused()) {
      container.style.cursor = 'crosshair'
    } else {
      container.style.cursor = ''
    }
    function isMoused() {
      let bounds = info.getBufferedBounds(6)
      for (let i=0;i<vm.locations.length;i++) {
        if (bounds.contains(vm.locations[i].latlng)) {
          return true
        }
      }
      return false
    }
  },
  // logic for clicks
  click(info) {
    let vm = this
    let point = isClicked()
    if (point) {
      alert(point.message)
    }
    
    function isClicked() {
      let bounds = info.getBufferedBounds(6)
      for (let i=0;i<vm.locations.length;i++) {
        if (bounds.contains(vm.locations[i].latlng)) {
          return vm.locations[i]
        }
      }
      return false
    }
  },
}

```
