<template>
    <div class="body">
      <Header></Header>
      <Nav></Nav>
      <Banner class="banner"></Banner>
    </div>
</template>

<script>
import Header from '../Header/Header.vue'
import Nav from '../Nav/Nav.vue'
import Banner from '../Banner/Banner.vue'
export default {
    data () {
      return {}
    },

    methods: {},

    components: {
        Header,
        Nav,
        Banner,
    },
}
</script>

<style scoped>
.body{
  height: 100%;
}
.banner{
  height: calc( 100% - 125px );
  overflow: scroll;
}
</style>