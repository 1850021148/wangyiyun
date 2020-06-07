<template>
    <div>
        <index :loadUrl="loadUrl" :lyric="lyric" :songData="songData" />
    </div>
</template>

<script>
import config from '../../config.js'

import Index from './Index/Index.vue'

export default {
    name: 'PlayMusic',

    data () {
      return {
          apiBaseUrl: config.apiBaseUrl,
          songData: null,
          songUrl: '/song/url?id=',
          lyricUrl: '/lyric?id=',
          loadUrl: '',
          lyric: '',
      }
    },

    created() {
        this.songData = this.$store.state.songData
        console.log(this.songData)
        this.axios.all( [ this.getLoadUrl(), this.getLyric() ] )
        .then( this.axios.spread( (res1,res2) =>{
            this.loadUrl = res1.data.data[0].url
            this.lyric = res2.data.lrc.lyric
        } ) )
        // this.axios.get( this.apiBaseUrl + this.songUrl + this.songId )
        // .then( res => {
        //     this.loadUrl = res.data.data[0].url
        // })
    },

    methods: {
        getLoadUrl() {
            return this.axios.get( this.apiBaseUrl + this.songUrl + this.songData.id )
        },
        getLyric() {
            return this.axios.get( this.apiBaseUrl + this.lyricUrl + this.songData.id )
        }
    },

    components: {
        Index,
    },
}
</script>

<style scoped>
</style>