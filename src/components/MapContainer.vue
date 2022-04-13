<template>
  <div class="home_div">
    <div class="map-title">
      <h3>JSAPI Vue3地图组件示例</h3>
    </div>
    <div style="height: 400px" id="container" />
  </div>
</template>
<script>
  import AMapLoader from '@amap/amap-jsapi-loader'
  import { shallowRef } from '@vue/reactivity'
  export default {
    name: 'mapcomtaint',
    setup () {
      const map = shallowRef(null)
      return {
        map
      }
    },
    create () {

    },
    mounted () {
      // DOM初始化完成进行地图初始化
      this.ininMap()
    },
    methods: {
      ininMap () {
        AMapLoader.load({
          key: '822c5d6b3d25da7c2f9fe0b6a30d4e1c', // 设置您的key
          version: '2.0',
          plugins: ['AMap.ToolBar', 'AMap.Driving']
        }).then((AMap) => {
          this.map = new AMap.Map('container', {
            // viewMode: '3D',
            // zoom: 5,
            // zooms: [2, 22],
            // center: [105.602725, 37.076636]
          })
          const positionArr = [
            [113.357224, 34.977186],
            [114.555528, 37.727903],
            [112.106257, 36.962733],
            [109.830097, 31.859027],
            [116.449181, 39.98614]
          ]
          for (const item of positionArr) {
            const marker = new AMap.Marker({
              position: [item[0], item[1]]
            })
            this.map.add(marker)
          }
        }).catch(e => {
          console.log(e)
        })
      },
      addMarker () {

      }
    }
  }
</script>
<style scope>
    .home_div{
        height: 100%;
        width: 100%;
        padding: 0px;
        margin: 0px;
        position: relative;
    }
    #container{
        height: 100%;
        width: 100%;
        padding: 0px;
        margin: 0px;
    }
    .map-title{
         position:absolute;
         z-index: 1;
         width: 100%;
         height: 50px;
         background-color: rgba(27, 25, 27, 0.884);

    }
    h3{
        position:absolute;
        left: 10px;
        z-index: 2;
        color: white;
    }

</style>
