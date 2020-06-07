<template>
    <div class="body">
      <keep-alive :exclude="/PlayMusic/">
        <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
import Index from './components/Index/Index.vue'
import PlayMusic from './components/PlayMusic/PlayMusic.vue'

export default {
    data () {
      return {}
    },

    created() {
      window.vue = this
      window.store = this.$store
    },

    methods: {},

    components: {
      Index,
      PlayMusic,
    },
}
</script>

<style scoped>
.body{
  height: 100%;
}
*{
  user-select: none;
}
</style>
