<template>
    <div class="outter">
        <h1>庄哥音乐</h1>
        <div class="disc" ref="disc" @click="togglePlay">
            <audio :src="loadUrl" ref="audio" loop autoplay />
            <img :src="background" />
        </div>
    </div>
</template>

<script>
import needleSrc from '../../../../assets/image/needle.png'
export default {
    data () {
      return {
          
      }
    },

    props: [
        'loadUrl',
        'background',
    ],

    mounted() {
        setTimeout( () => {
            this.$refs.audio.oncanplay = () => {
                this.$store.commit('duration',this.$refs.audio.duration)
            }
            this.$refs.audio.ontimeupdate = () => {
                this.$refs.audio.volume = this.$store.state.volume
                this.$store.commit('currentTime',this.$refs.audio.currentTime)
            }
        },20)
    },

    methods: {
        togglePlay(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play()
                this.$refs.disc.classList.remove('paused')
                this.$refs.disc.classList.add('running')
            }
            else{
                this.$refs.audio.pause()
                this.$refs.disc.classList.remove('running')
                this.$refs.disc.classList.add('paused')
            }
        }
    },

}
</script>

<style scoped>
.outter{
    width: 100%;
    padding-top: 80px;
    padding-bottom: 20px;
    position: relative;
}

.outter::after{
    content: "";
    display: block;
    position: absolute;
    width: 120px;
    height: 150px;
    top: 0;
    left: 50%;
    background: url(../../../../assets/image/needle.png) no-repeat;
    z-index: 5;
    background-size: contain;
}

h1{
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 16px;
    font-weight: 100;
}

.disc{
    margin: auto;
    width: 80vw;
    height: 80vw;
    border: 40px solid black;
    border-radius: 50%;
    background: rgba(0, 0, 0, .75);
    animation: rotate-disc 20s linear infinite;
}
audio{
    display: none;
}
img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.running{
    animation-play-state: running;
}

.paused{
    animation-play-state: paused;
}

@keyframes rotate-disc {
    0% {
        transform: rotateZ(0deg);
    }
    100% {
        transform: rotateZ(360deg);
    }
}
</style>