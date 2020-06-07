<template>
    <div>
        <h2>最新音乐</h2>
        <ul>
            <li v-for="song in newSongList" :key="song.id">
                <a :href="song.href">
                    <div class="left">
                        <p class="songName">{{song.name}}</p>
                        <div class="info">
                            <img src="" alt="" class="SQicon">
                            <span v-for="(artist,index) in song.song.artists" :key="artist.id">
                                <span v-if="index != 0"> / </span>{{artist.name}}
                            </span>
                            - {{song.name}}
                        </div>
                    </div>
                    <div class="right">
                        <img src="../../../public/icons/play.jpg" alt="">
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import config from '../../config.js'
export default {
    data () {
      return {
          apiBaseUrl: config.apiBaseUrl,
          newSongListUrl: '/personalized/newsong',
          newSongList: [],
      }
    },

    created(){
        this.getNewSongList()
    },

    methods: {
        getNewSongList(){
            this.axios.get( this.apiBaseUrl + this.newSongListUrl ).then( e => {
                if(e.data.code != 200){
                    return console.log('最新音乐请求失败')
                }
                this.newSongList = e.data.result
                this.newSongList.forEach( song => {
                    song.href = '//music.163.com/m/song?id=' + song.id
                } )
                // console.log(this.newSongList)
            })
        }
    },

    components: {},
}
</script>

<style scoped>
h2{
    padding: 10px;
    height: 40px;
    font-size: 17px;
    font-weight: 500;
    line-height: 20px;
    border-left: 5px solid red;
}

ul{
    height: 550px;
    padding: 20px 10px;
}
li{
    padding-top: 5px;
    border-bottom: .5px solid rgb(230, 230, 230);
    height: 55px;
}
.left{
    display: inline-block;
    width: calc( 100% - 50px );
}
.left .info{
    padding-top: 10px;
    color: #888888;
    font-size: 12px;
}
.right{
    display: inline-block;
    width: 50px;
}
</style>