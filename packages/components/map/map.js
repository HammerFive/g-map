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

      map.value = new AMapInstance.Map('map', {})

      map.value.on('complete', () => {
        isMapLoaded.value = true
      })
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
