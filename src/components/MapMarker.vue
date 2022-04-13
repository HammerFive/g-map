<template>
  <span>I am Marker</span>
</template>
<script>
  import { inject, onMounted } from 'vue'

  export default {

    setup () {
      const AMap = inject('AMap')

      onMounted(() => {
        console.log(AMap)
      })
    }
  }

</script>
