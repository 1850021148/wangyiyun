<template>
    <div>
      <ul>
        <router-link :to="{ name: 'recommend' }" tag="li" :class="{ active: this.$route.name === 'recommend' }">推荐音乐</router-link>
        <router-link :to="{ name: 'hot' }" tag="li" :class="{ active: this.$route.name === 'hot' }">热歌榜</router-link>
        <router-link :to="{ name: 'hotSearch' }" tag="li" :class="{ active: this.$route.matched[1].name === 'search' }">搜索</router-link>
      </ul>
    </div>
</template>

<script>
export default {
    data () {
      return {}
    },

    methods: {},

    components: {},
}
</script>

<style scoped>
ul{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgb(221, 216, 216);
}
li{
  cursor: pointer;
  width: 60px;
  height: 40px;
  font-size: 15px;
  line-height: 40px;
  text-align: center;
}
.active{
  color: red;
  border-bottom: 2px solid red;
}
</style>