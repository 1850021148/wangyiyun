<template>
    <div class="body" v-cloak>
        <div class="bg" ref="bg"></div>
        <div class="slide">
            <div class="wrapper">
                <song-disc :loadUrl="loadUrl" :background="songData.picUrl" />
                <lyric-box :lyricObj="lyricObj" :songName="songData.name" :songerName="songData.song.artists[0].name" />
                <progress-bar />
            </div>
        </div>
    </div>
</template>

<script>
import SongDisc from './SongDisc/SongDisc.vue'
import LyricBox from './LyricBox/LyricBox.vue'
import ProgressBar from './ProgressBar/ProgressBar.vue'

// import LyricParser from 'lyric-parser'

export default {
    data () {
      return {
          lyricParser: null,
          lineNum: 0,
          currentLyric: '最好的幸运',
          maxTime: null,
          currentTime: null,
      }
    },

    props: [
        'loadUrl',
        'lyric',
        'songData',
    ],

    computed: {
        lyricObj() {
            if(typeof this.lyric === 'string'){
                let arr = []
                let cols = this.lyric.split('\n')
                for( let i = 0; i < cols.length; i++ ){
                    if( cols[i] == '' ){
                        break
                    }
                    arr[i] = {
                        lineNum: i,
                        time: cols[i].split('[')[1].split(']')[0],
                        txt: cols[i].split('[')[1].split(']')[1],
                    }
                }
                return arr
            }
        }
    },

    mounted() {
        this.$refs.bg.style.backgroundImage = 'url(' + this.songData.picUrl + ')'
    },

    components: {
        SongDisc,
        LyricBox,
        ProgressBar,
    },
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}

.body{
    height: 100vh;
    position: relative;
    overflow: hidden;
}
.bg{
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: 50% 50%;
    transform: scale(1.5);
    filter: blur(10px) brightness(.5);
}
.slide{
    height: 100vh;
    overflow: scroll;
    color: white;
}
</style>