<template>
    <div class="bottom">
        <img src="../../assets/logo.jpg" alt="">
        <p>网易云音乐</p>
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
.bottom{
    height: 220px;
    background: linear-gradient(rgb(255, 255, 255),rgb(255, 235, 235));
    position: relative;
    z-index: -1;
}
img{
    width: 50px;
    position: absolute;
    top: 40%;
    left: 20%;
}
p{
    font-size: 30px;
    font-weight: 500;
    position: absolute;
    left: 40%;
    top: 42%;
}
</style>