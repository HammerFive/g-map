import { shallowRef, provide, ref, onMounted, h } from 'vue'

import getMapFn from '../../mixins/a-map'

export default {
  name: 'GMap',

  setup (props, context) {
    const AMap = shallowRef(null)
    const map = shallowRef(null)
    const isMapLoaded = ref(false)

    const container = ref(null)

    provide('AMap', AMap)
    provide('isMapLoaded', isMapLoaded)
    provide('map', map)

    onMounted(async () => {
      const { initMap } = getMapFn()

      const AMapInstance = await initMap()
      AMap.value = AMapInstance

      const mapInstance = new AMapInstance.Map('map', {
        resizeEnable: true,
        rotateEnable: true,
        pitchEnable: true,
        zoom: 4,
        zooms: [4, 20],
        viewMode: '3D',
        buildingAnimation: true,
        // center: [116.333926, 39.997245],
        center: [116.397087, 39.916027],
        mapStyle: 'amap://styles/darkblue'
      })

      mapInstance.on('complete', () => {
        isMapLoaded.value = true
      })
      mapInstance.addControl(
        new AMapInstance.ControlBar({
          showZoomBar: false,
          showControlButton: true,
          position: {
            right: '10px',
            bottom: '10px'
          }
        })
      )
      map.value = mapInstance
    })
    return {
      AMap,
      map,
      isMapLoaded,
      container
    }
  },
  render () {
    const slots = this.isMapLoaded ? this.$slots.default() : null
    return h(
      'div', {
        id: 'map',
        ref: 'container',
        class: 'g-map',
        style: {
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0
        }
      },
      [
        h(
          'div',
          {
            class: 'g-map-slot-container'
          },
          [slots]
        )
      ]
    )
  }
}
