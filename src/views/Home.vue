<template>
  <div
    class="bg-gray-50"
    style="height: 100%;">
    <div class="bg-pink-300 p-1 w-24 button-list">
      <button
        class="border-black bg-slate-500 p-1"
        @click="add">
        新增点
      </button>
      <div />
      <button
        class="bg-slate-400 p-1"
        @click="hide">
        清除点
      </button>
      <div></div>
      <button
        class="bg-slate-300 p-1"
        @click="show">
        显示点
      </button>
    </div>
    <g-map ref="map">
      <g-marker
        ref="myMarker"
        :options="markerOptions"
        @click="test" />
    </g-map>
  </div>
</template>

<script setup>
  import projectData from '../source/data'

  import { ref, shallowRef } from '@vue/reactivity'

  const markerOptions = ref()
  const myMarker = ref()
  const map = shallowRef()

  markerOptions.value = createOptions()

  function test (e) {
    console.log(e)
  }
  function add () {
    const projects = projectData.map(project => {
      return {
        extData: project,
        position: [
          project.longitude,
          project.latitude
        ]
      }
    })
    markerOptions.value = projects
  }
  function hide () {
    myMarker.value.hide()

    // map.value.map.setZoom(20, false, 2000)

    // setTimeout(() => {
    //   map.value.map.setZoom(4, false, 2000)
    // }, 3000)
  }
  function show () {
    myMarker.value.show()
  }
  function createOptions () {
    const options = []
    const xList = [121.43, 121.435, 121.44, 121.445, 121.44]
    const yList = [31.229, 31.2295, 31.23, 31.2295, 31.23]
    for (let i = 0; i < 4000; i++) {
      const num = 0.001 * (Math.random() * i)
      const x = parseInt(Math.random() * 5)
      options.push({
        extData: i,
        position: [xList[x] + num / 3, yList[x] + num / 6]
      })
    }
    return options
  }
</script>
