<template>
    <div id="box">
      <keep-alive>
        <router-view name="indexBody"></router-view>
      </keep-alive>
    </div>
</template>

<script>
export default {
    data () {
      return {}
    },

    methods: {},

    components: {
      
    },
}
</script>

<style scoped>
#box::-webkit-scrollbar{
  display: none;
}
</style>