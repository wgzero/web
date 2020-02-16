<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="handleMixin">点击</button>
    <!-- <h1 @click="windZero">插件</h1> -->
    <h2>{{ itemList | getNumber }}</h2>
    <button @click="changeHandle">change</button>
    <div>{{ message }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import myMixin from '@/mixins/index.js'

export default {
  name: 'Home',
  mixins: [myMixin],
  components: {
    HelloWorld
  },
  data() {
    return {
      itemList: [1,2,3,4,5,6],
      message: 'hello world'
    }
  },
  mounted () {
    console.log('mounted')
  },
  updated () {
    console.log('update');
    this.succe()
  },
  methods: {
    changeHandle() {
      this.message = 'summer'
    },
    succe(){
      console.log('change update')
    }
  },
}
</script>
