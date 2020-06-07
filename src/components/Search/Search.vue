<template>
    <div class="searchBody">
        <div class="searchBox">
            <form>
                <i class="searchIcon"></i>
                <input id="search" type="search" placeholder="搜索歌曲、歌手、专辑" v-model="inputValue" @keyup="keyup($event)">
            </form>
        </div>

        <router-view name="searchBox" :inputValue="inputValue" @search="search"></router-view>
    </div>
</template>

<script>
import config from '../../config.js'

export default {
    data () {
      return {
          searchCookie: '[]', // JSON的字符串数组
          inputValue: '', // 搜索框的值
          searchSrc: [],
          apiBaseUrl: config.apiBaseUrl,
          page: 1,
          hotSearchList: [],
          historySearch: [],
          keywords: '',
      }
    },

    created(){

        this.searchCookie = this.$cookies.get('search')

        this.$watch('searchCookie',(newData,oldData) => {
            this.$cookies.set("search",newData)
        })
    },

    methods: {
        // 搜索框中键盘监听
        keyup(e) {
            if(!this.inputValue) { // 空字
                this.$router.replace({ name: 'hotSearch' }).catch(err => {})
                return
            }
            if(e.keyCode === 13) { // 回车键
                this.search(this.inputValue)
            }
            else if(e.keyCode) {
                this.$router.replace({ name: 'recSearch' }).catch(err => {})
            }
        },
        // 跳转searchRes界面,并添加localStorage
        search(word){
            console.log('word:'+word,typeof word)
            // request
            // this.axios.get( this.apiBaseUrl + `/search?keywords=${word}&limit=${this.page * 30}` ).then( e => {
            //     if(e.data.code != 200){
            //         return console.log('搜索失败')
            //     }
            //     this.searchSrc = e.data.result
            //     console.log(this.searchSrc)
            // } )

            this.$store.commit('searchedWord',word)

            this.addHistory(word)

            this.$router.replace({ name: 'searchRes' }).catch(err => {})

        },

        // 添加localStorage
        addHistory(word) {
            let history = []
            if( localStorage.getItem('history') ) {
                history = JSON.parse( localStorage.getItem('history') )
            }
            if( !this.hasEl(history,word) ) {
                history.push(word)
                localStorage.setItem('history', JSON.stringify(history) )
            }
            else
                return
        },

        // 查看数组中是否有某元素,return bool
        hasEl(arr,item) {
            let bool = false
            arr.forEach(e => {
                if(e == item) {
                    bool = true
                }
            })
            return bool
        }
    },

    components: {

    },
}
</script>

<style scoped>
.searchBody{
    width: 100%;
    height: 100vh;
}
.searchBody::-webkit-scrollbar{
    display: none;
}
.searchBox{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: .5px solid #eeeeee;
}
form{
    width: 90%;
    height: 30px;
    background: #ebecec;
    border-radius: 15px;
    position: relative;
}
.searchIcon{
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
    display: block;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
}
.searchIcon img{
    width: 100%;
    opacity: .3;
}
input[type=search]::-webkit-input-placeholder{
    color: #c6c6cc;
}
input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
}
input[type=search]{
    width: calc( 100% - 40px );
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 30px;
}


/* .hotSearchBox{
    padding: 10px;
}
.hotSearchBox p{
    font-size: 12px;
    color: #666;
}
.hotSearchBox ul{
    display: flex;
    flex-wrap: wrap;
}
.hotSearchBox li{
    margin-top: 10px;
    margin-left: 10px;
    padding: 5px 10px;
    height: 30px;
    line-height: 18px;
    border: 1px solid #d3d4da;
    border-radius: 15px;
    color: #333;
    font-size: 14px;
}

.historySearchBox li{
    width: 100%;
    height: 45px;
    border-bottom: .5px solid #eeeeee;
}

.historyIcon{
    display: inline-block;
    width: 30px;
    height: 45px;
    text-align: center;
    line-height: 45px;
}
.historyIcon i{
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+);
}
.historySearchBox span{
    display: inline-block;
    line-height: 45px;
    width: calc( 100% - 60px );
}
.delIcon{
    display: inline-block;
    width: 30px;
    height: 45px;
}
.delIcon i{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
} */
</style>