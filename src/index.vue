<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import L from 'leaflet'
  import '@skinnyjames/leaflet-canvas'
  
  export default {
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
        ]

        for (let i=0;i<events.length;i++) {
          vm.mapObject.on(events[i], function(info) {
            vm.$emit('l-' + events[i], info)
          })
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
