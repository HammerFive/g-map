import { inject, onMounted, shallowRef, toRef, watch, h } from 'vue'

export default {
  name: 'GMarker',
  emits: ['click'],
  props: {
    options: Array
  },
  setup (props, context) {
    const AMap = inject('AMap').value
    const map = inject('map').value
    const markerGroup = shallowRef(null)
    const options = toRef(props, 'options')
    const animateOption = {
      zoom: 18,
      pitch: 60,
      rotation: 0
    }
    onMounted(() => {
      getMarkerInstanceList(options.value)

      map.add(markerGroup.value)
    })

    watch(options, (options) => {
      markerGroup.value.clearOverlays()

      getMarkerInstanceList(options)

      map.add(markerGroup.value)
    })

    function getIcon (url) {
      const icon = new AMap.Icon({
        size: new AMap.Size(28, 28),
        image: url,
        imageSize: new AMap.Size(28, 28)
      })

      return icon
    }

    function getMarker (option) {
      const marker = new AMap.Marker({
        icon: getIcon('/images/marker.png'),
        position: option.position,
        offset: [-20, -20],
        extData: option.extData
      })

      return marker
    }

    function getMarkerInstanceList (options) {
      const markerInstanceList = options.map(option => {
        const marker = getMarker(option)

        marker.on('click', e => {
          // todo 不使用遍历实现
          markerGroup.value.eachOverlay(marker => {
            marker.setIcon(getIcon('/images/marker.png'))
          })

          e.target.setIcon(getIcon('/images/marker-active.gif'))
          const data = e.target.getExtData()
          const { lat, lng } = e.lnglat

          context.emit('click', {
            data,
            position: [lng, lat]
          })

          // animation
          const { zoom, pitch, rotation } =
            option.animateOption || animateOption

          // map.setZoomAndCenter(
          //   zoom,
          //   [lng, lat],
          //   false,
          //   400
          // )
          map.setZoom(zoom, false, 800)

          map.panTo([lng, lat], 800)
          map.setPitch(pitch, false, 500)
          // map.setRotation(rotation, false, 500)
          // console.log(map.getCenter().lng, map.getCenter().lat)
          // console.log(lng, lat)
        })

        return marker
      })
      markerGroup.value = new AMap.OverlayGroup(markerInstanceList)
    }

    function hide () {
      markerGroup.value.hide()
    }

    function show () {
      markerGroup.value.show()
    }

    return {
      map,
      AMap,
      markerGroup,
      hide,
      show
    }
  },

  render () {
    return h('p')
  }
}
