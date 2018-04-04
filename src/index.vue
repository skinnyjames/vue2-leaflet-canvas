<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import L from 'leaflet'
  import '@skinnyjames/leaflet-canvas'
  
  export default {
    props: ['locations'],
    mounted() {
      
      this.mapObject = new L.CanvasLayer()
      if (this.$parent._isMounted) {
        this.deferredMountedTo(this.$parent.mapObject)
      }
    },
    beforeDestroy() {
      this.setVisible(false)
    },
    methods: {
      deferredMountedTo(parent) {
        let vm = this
        vm.parent = parent
        let events = 
        [ 'zoom'
        , 'mousemove'
        , 'drawing'
        , 'click'
        , 'resize'
        , 'viewreset'
        , 'move'
        , 'moveend'
        , 'mounted'
        , 'unmounted'
        ]

        for (let i=0;i<events.length;i++) {
          vm.mapObject.on(events[i], function(info) {

            if (vm.locations) {

              info.locations = vm.locations

              switch (events[i]) {
                case 'click': 
                  info.clickedLocations = getClickedObjects(info)    
                  break
                case 'mousemove':
                  info.isMoused = isMoused(info)
                  break;
              }
            }

            vm.$emit('l-' + events[i], info)
          })

          function isMoused(info) {
            let bounds = info.getBufferedBounds(6)
            for (let ii=0; ii < vm.locations.length; ii++) {

              if (bounds.contains(vm.locations[ii].latlng)) {
                return true
              }
            } 
            return false
          }

          function getClickedObjects(info) {
            let bounds = info.getBufferedBounds(6)
            let clickedObjects = []
            for (let ii=0; ii < vm.locations.length; ii++) {

              if (bounds.contains(vm.locations[ii].latlng)) {
                clickedObjects.push(vm.locations[ii])
              }
            } 
            return clickedObjects
          }
        }
        vm.mapObject.on('mounted', function(info) {
          vm.$emit('mounted', info)
        })

        vm.mapObject.addTo(parent)  
      },
      draw() {
        this.mapObject.draw()
      },
      setVisible(newVal, oldVal) {
        if (newVal == oldVal) return;
        if (newVal) {
          this.mapObject.addTo(this.parent);
        } else {
          this.parent.removeLayer(this.mapObject);
        }
      },
    }, 
  }
</script>
