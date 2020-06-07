<template>
    <div>
        <h2>推荐歌单</h2>
        <ul>
            <li v-for="song in recSongList" :key="song.id">
                <a :href="song.href">
                    <p class="playCount">{{song.playCount}}</p>
                    <img :src="song.picUrl" alt="">
                    <p class="songName">{{song.name}}</p>
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
          recSongListUrl: '/personalized?limit=6',
          recSongList: [],
        }
    },

    created(){
        this.getRecommend()
    },

    methods: {
        parsePlayCount(num){
            if( num < 100000 ){
                return num
            }
            else if( num >= 100000 && num < 100000000 ){
                return ( ~~(num/1000) ) / 10 + '万'
            }
            else
                return ( ~~(num/10000000) ) / 10 + '亿'
        },

        getRecommend(){
            this.axios.get( this.apiBaseUrl + this.recSongListUrl ).then( e => {
                if(e.data.code != 200){
                    return console.log('推荐歌单请求失败')
                }
                this.recSongList = e.data.result
                this.recSongList.forEach(song => {
                    song.href = '//y.music.163.com/m/playlist?id=' + song.id
                    song.playCount = this.parsePlayCount(song.playCount)
                });
                // console.log(this.recSongList)
            } )
        },
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
    height: 400px;
    display: flex;
    flex-flow: row wrap;
}

li{
    width: 33.3%;
    position: relative;
    padding: 5px;
}
.playCount{
    position: absolute;
    top: 7px;
    right: 7px;
    font-size: 12px;
    color: white;
}
img{
    width: 100%;
}
.songName{
    color: #333333;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 15px;
    line-height: 20px;

    height: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>