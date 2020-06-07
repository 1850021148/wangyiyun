<template>
    <div class="proBar">
        <div class="left">{{ currentTimeStr }}</div>
        <input class="bar1" type="range" ref="bar1" @change="change" :value="currentTime" :max="max" step=".5" />
        <div class="right">{{ totalTimeStr }}</div>
        <input class="bar2" type="range" v-model="volume" max="1" step=".1" />
    </div>
</template>

<script>
export default {
    data () {
      return {
          volume: null,
      }
    },

    mounted() {
        setTimeout( () => {
            this.volume = 1
        },20)
    },

    watch: {
        volume(newVal) {
            this.$store.commit('volume',newVal)
        },
    },

    computed: {
        max() {
            return this.$store.state.duration
        },
        currentTime() {
            return this.$store.state.currentTime
        },
        currentTimeStr() {
            return this.parseTime(this.$store.state.currentTime)
        },
        totalTimeStr(){
            return this.parseTime(this.$store.state.duration)
        },
    },

    methods: {
        change() { // 反向影
            this.$store.commit('currentTime',this.$refs.bar1.value)
            document.querySelector('audio').currentTime = this.$refs.bar1.value
        },
        parseTime(num){
            let min = ~~( num / 60 )
            if(min < 10){
                min = '0' + min
            }
            let second = ~~(num % 60)
            if(second < 10){
                second = '0' + second
            }
            return min + ':' + second
        },
    },
}
</script>

<style scoped>
[v-cloak]{
    display: none;
}

.proBar{
    width: 100%;
    padding: 20px;
    padding-top: 80px;
    display: flex;
    align-items: center;
    position: relative;
}

.left,.right{
    width: 4em;
    text-align: center;
}

input[type=range] {
    border-radius: 4px;
    appearance: none;
    opacity: .8;
    height: 8px;
}

.bar1{
    flex: 1;
    background-image: linear-gradient(90deg,black 50%,gray);
}

.bar2{
    position: absolute;
    top: 50px;
    right: -30px;
    width: 100px;
    transform: rotateZ(-90deg);
    background-color: #444;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    border-radius: 50%;
}

.bar1::-webkit-slider-thumb{
    border: 2px solid #111;
    box-sizing: content-box;
    width: 18px;
    height: 18px;
    background: #bbb;
    opacity: .8;
}

.bar2::-webkit-slider-thumb{
    width: 15px;
    height: 15px;
    background: #bbb;
}

</style>