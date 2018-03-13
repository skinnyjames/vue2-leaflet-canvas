<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import L from 'leaflet'
  import 'leaflet-canvas-layer'
  
  export default {
    mounted() {
      this.mapObject = this.drawObject()
       
      console.log(this.$parent);
      debugger
      if (this.$parent._isMounted) {
        this.deferredMountedTo(this.$parent.mapObject)
      }else{
        console.log('FLASE')
        debugger
      }
    },
    beforeDestroy() {
      this.setVisible(false)
    },
    methods: {
      deferredMountedTo(parent) {
        let vm = this  
        
        console.log('parent', parent)
        debugger
        vm.parent = parent
        vm.mapObject.addTo(parent)

        for (var i=0;i<vm.$children.length;i++) {
          if (typeof vm.$children[i].deferredMountedTo === "function") {
            vm.$children[i].deferredMountedTo(vm.mapObject)
          }
        }
      },
      draw() {
        let vm = this
        vm.mapObject.needRedraw()
      },
      addLayer() {
        
      },
      drawObject() {
        let vm = this
        let mapObject = null

      /*  if (vm.custom) {
          let customCanvas = function() {
            this.onLayerDidMount = function() {
              vm.$emit('mounted', this)
            }
            this.onLayerWillUnmount = function() {
              vm.$emit('unmount', this)
            }
            this.onClickLayer  = function(e) {
              vm.$emit('click', e)
            },    

            this.onLayerDidMouse = function(e) {
              vm.$emit('move', e)
            },
            this.setData = function(data) {
              vm.$emit('data', data, this)
            }
            this.onDrawLayer = function(viewInfo) {
              vm.$emit('draw', viewInfo, this)
            }
          } 
          customCanvas.prototype = new L.CanvasLayer()
          mapObject = new customCanvas()   
        } else {
          mapObject =  L.canvasLayer().delegate(vm)
        }*/

        mapObject =  L.canvasLayer().delegate(vm)
        return mapObject 

      },
      onDrawLayer(info) {
        let vm = this
        let map = vm.$parent.mapObject
        let ctx = info.canvas.getContext('2d')

        ctx.clearRect(0,0, info.canvas.width, info.canvas.height)
        ctx.fillStyle = "rgba(255, 116, 0, 1)"

        let markers = vm.$children.map(marker => marker.mapObject)
        for (let i=0; i<markers.length; i++) {
          let dot = map.latLngToContainerPoint(markers[i]._latlng)           
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.closePath()
        }
        info.layer.fire('zoom')        
        vm.$emit('draw', info)
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
