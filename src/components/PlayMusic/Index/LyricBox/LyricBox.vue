<template>
    <div class="lyricBox">
        <div class="inner" v-cloak>
            <h2>{{ songName }} - <span style="color: #ccc">{{ songerName }}</span></h2>
            <div class="filter">
                <ul class="lyric" ref="lyric">
                    <li :class="{ active: item.lineNum == lineNum - 1 }" v-for="item in lyricObj" :key="item.lineNum">
                        {{ item.txt }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
      return {
          currentLyric: null,
      }
    },

    props: [
        'songName',
        'songerName',
        'lyricObj',
    ],

    watch: {
        lineNum(newVal) {
            console.log('lineNum:',newVal)
            this.$refs.lyric.style.transform = `translateY(-${( newVal - 2 ) * 20}px)`
        },
    },

    computed: {
        lineNum() {
            for(let i = 0; i < this.lyricObj.length; i++){
                if(this.parseTime(this.lyricObj[i].time) >= this.$store.state.currentTime){
                    if(i > 0 && this.parseTime(this.lyricObj[i-1].time) < this.$store.state.currentTime){
                        return this.lyricObj[i].lineNum
                    }
                }
            }
        },
    },

    methods: {
        parseTime(str){
            let [min,second] = str.split(':')
            return min * 60 + second * 1
        }
    },

}
</script>

<style scoped>
[v-cloak] {
    display: none;
}

.lyricBox{
    padding: 0 30px;
}

h2{
    font-weight: 500;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100%;
    text-overflow: ellipsis;
}

.filter{
    width: 100%;
    height: 65px;
    -webkit-mask: -webkit-linear-gradient(top,#000,#000 70%,rgba(0,0,0,0));
}

.lyric{
    transition: .5s;
}

.lyric>li{
    width: 100%;
    text-align: center;
    font-size: 13px;
    line-height: 20px;
    color: #ccc;
    height: 20px;
}

.active{
    color: white !important;
}
</style>