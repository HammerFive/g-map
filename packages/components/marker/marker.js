import { inject, onMounted } from 'vue'

export default {
  name: 'GMarker',

  setup (props, context) {
    const AMap = inject('AMap').value
    const map = inject('map').value
    onMounted(() => {
      const markerInstanceList = createOptions().map(option => {
        return getMarker(option)
      })

      map.add(markerInstanceList)
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
        extData: option.myData
      })

      return marker
    }

    function createOptions () {
      const options = []
      const xList = [121.43, 121.435, 121.44, 121.445, 121.44]
      const yList = [31.229, 31.2295, 31.23, 31.2295, 31.23]
      for (let i = 0; i < 1000; i++) {
        const num = 0.001 * (Math.random() * i)
        const x = parseInt(Math.random() * 5)
        options.push({
          myData: i,
          position: [xList[x] + num / 3, yList[x] + num / 6]
        })
      }
      return options
    }

    return {
      map,
      AMap
    }
  }
}
