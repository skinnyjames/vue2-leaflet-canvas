<template>
  <div style="width:100%;height:100%;">
    <button @click="changeNumber">Change</button>
    <v-map :zoom=10 :center="initialLocation">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-canvas-layer ref="canvas" :custom="false">
        <v-marker v-for="(marker, index) in locations" :key="index" :lat-lng="marker.latlng"></v-marker>
      </v-canvas-layer>
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
      'v-marker': Vue2Leaflet.Marker,
      'v-canvas-layer': Vue2LeafletCanvas
    },
    mounted() {
      let vm = this
      let canvas = vm.$refs.canvas
      //canvas
    },
    methods: {
      changeNumber() {
        let vm = this
        let canvas = vm.$refs.canvas
        vm.locations = []
        let num = Math.random() * 10
        for (let i=0;i<num; i++) {
          console.log(i)
          let [lat,lng] = randomCoordinates().split(',')
          vm.locations.push({ latlng: window.L.latLng(lat, lng) })
        }
        canvas.draw()
        
      }
    },
    data() {
      let locations = []
      let i = 5
      while(--i) {
        let [lat,lng] = randomCoordinates().split(',')
        locations.push({ latlng: window.L.latLng(lat, lng) })
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
