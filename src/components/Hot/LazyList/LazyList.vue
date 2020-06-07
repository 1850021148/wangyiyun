<template>
    <div>
        <ul>
            <li @click="play(song)" tag="li" v-for="song in songsData" :key="song.id">
                <img class="songImg" v-lazy="song.picUrl">
                <div class="details">
                    <p class="songName">{{song.name}} <span class="alias">{{ (song.song.alias.length > 0) ? song.song.alias[0] : null }}</span></p>
                    <p class="songer">{{ song.song.artists[0].name }} - {{ song.song.album.name }}</p>
                </div>
                <div class="play">▶</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
      return {
          
      }
    },

    props: [
        'songsData'
    ],

    watch: {
        songsData() {
            if(typeof this.songsData == 'object'){
                console.log(this.songsData)
            }
        }
    },

    methods: {
        play(songData){
            this.$store.commit('songData',songData)
            this.$router.push('/play-music')
        }
    },

    components: {},
}
</script>

<style scoped>
ul{
    margin-top: 30px;
    padding: 0 10px;
}
li{
    margin-top: 5px;
    display: flex;
    border-bottom: .5px solid gray;
}
.details{
    width: 80%;
    padding: 0 10px;
}
.songImg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.songName{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.alias{
    color: gray;
}
.songer{
    padding-top: 5px;
    color: #888;
    font-size: 12px;
    line-height: 20px;
}
.play{
    display: inline;
    line-height: 45px;
    margin-left: 0;
    color: #888;
}
</style>