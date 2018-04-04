<template>
  <div style="width:100%;height:100%;">
    <button @click="changeNumber">Change</button>
    <v-map ref="map" :zoom=10 :center="initialLocation">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-canvas-layer
        ref="canvas"
        :locations="locations"
        @l-drawing="drawing"
        @l-mousemove="hover"
        @l-click="click"
      ></v-canvas-layer>
    </v-map>
  </div>
</template>

<script>
  import Vue2Leaflet from 'vue2-leaflet'
  import Vue2LeafletCanvas from '../src/index'
  import randomCoordinates from 'random-coordinates' 

  export default {
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-canvas-layer': Vue2LeafletCanvas
    },
    mounted() {
      let vm = this
    },
    methods: {
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
        info.layer.fire('zoom')
      },
      hover(info) {
        let vm = this
        let container = document.getElementsByClassName('leaflet-container')[0]
        if (info.isMoused) {
          container.style.cursor = 'crosshair'
        } else {
          container.style.cursor = ''
        }
      },
      click(info) {
        let vm = this
        let points = info.clickedLocations
        if (points[0]) {
          alert(points[0].message)
        }
      },
      changeNumber() {
        let vm = this
        let canvasLayer = vm.$refs.canvas
        vm.locations = []
        let num = Math.random() * 10
        for (let i=0;i<10000; i++) {
          console.log(i)
          let [lat,lng] = randomCoordinates().split(',')
          vm.locations.push({ latlng: window.L.latLng(lat, lng), message: 'hello ' + i })
        }
        canvasLayer.draw()
      }
    },
    data() {
      let locations = []
      let i = 40000
      while(--i) {
        let [lat,lng] = randomCoordinates().split(',')
        locations.push({ latlng: window.L.latLng(lat, lng), message: 'hello ' + i })
      }
    
      return { 
        locations: locations,
        initialLocation: window.L.latLng(-34.9205, -57.953646)
      }
    },
  }
  
</script>

<style module>
  html, body {
    height: 100%
  }
</style>
