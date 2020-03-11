<template>
  <div id="app">
    <top/>
    <router-view/>
    <foot/>
  </div>
</template>

<script>
import top from '@/components/common/head'
import foot from '@/components/common/foot'
export default {
  name: 'App',
  components: {
    top, foot
  }
}
</script>

<style>
#app {
  margin: 0px;
  background: #EBEEF5;
}
</style>
