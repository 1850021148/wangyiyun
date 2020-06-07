<template>
    <ul class="box">
        <li v-for="song in searchList" :key="song.id" class="common-li">
            <p class="songname">{{ song.name }}</p>
            <p class="songer">{{ getSongDetails(song) }}</p>
            <a :href="`https://y.music.163.com/m/song?id=${song.id}`">
                <i class="play"></i>
            </a>
        </li>
    </ul>
</template>

<script>
import config from '../../../config.js'
export default {
    data () {
      return {
          apiBaseUrl: config.apiBaseUrl,
          searchUrl: '/search',
          searchList: [],
      }
    },

    created() {
        this.search()
    },

    methods: {
        search() {
            console.log('//////////////////////')
            this.axios.get( `${this.apiBaseUrl+this.searchUrl}?keywords= ${this.$store.state.searchedWord}` )
            .then( res => {
                console.log('llllllllllllllll: ',res.data.result)
                this.searchList = res.data.result.songs
            })
        },
        getSongDetails(song) {
            let str = ''
            song.artists.forEach((item,index) => {
                if(index == 0)
                    str += item.name
                else
                    str += ' / ' + item.name
            })
            str += ' - ' + song.album.name
            return str
        },
    },

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.box{
    padding: 10px;
}

.common-li{
    position: relative;
    width: 100%;
    height: 45px;
    border-bottom: .5px solid #eee;
}
.songer{
    font-size: 12px;
}
.play{
    position: absolute;
    display: block;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 5px;
    background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAgACUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3iedLeFpZDhR+Z9qrBb65+ZpBaoeiKoZ/xJ4H5UT4l1S3iblY0aXHvkAfzNM1u4ltdJmmhbbIpXBx7imBIYL2L5orvzcfwTIOfxUDFS21yLgMCpSVDh426qf8PesjSPEa3si29xGVmbgMgyD/AIVo3A8rUrWVePMzE3vwWH5YP50AXaKKKAKV7mCeG8AJWMFJcdlPf8CB+tOvrVNSsGg8zCSYO5eeM5q3VP7AI2JtZ5IM9UXBX8j0/CgBbHTbXT49sEYB7ueWP40xW+2airocw22fm7M544+gz+dONlJKNtxeSyJ3VQEB+uOf1q1HGkUapGoVVGAAMAUAOooooA//2Q==);
}
</style>