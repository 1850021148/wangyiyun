<template>
    <div>
        <div class="hotSearchBox">
            <p>热门搜索</p>
            <ul>
                <li @click="search(label.first)" v-for="(label,index) in hotSearchList" :key="index">{{label.first}}</li>
            </ul>
        </div>

        <ul class="historySearchBox">
            <li v-for="(word,index) in historyList" :key="index">
                <div class="historyIcon"><i></i></div>
                <span @click="search(word)">{{word}}</span>
                <div class="delIcon" @click="delHistory(word)"><i></i></div>
            </li>
            <!-- <li>
                <div class="historyIcon">
                    <i></i>
                </div>
                <span @click="search('周杰伦')">周杰伦</span>
                <div class="delIcon" @click="delHistory(word)"><i></i></div>
            </li> -->
        </ul>
    </div>
</template>

<script>
import config from '../../../config.js'
export default {
    data () {
      return {
          hotSearchList: [],
          apiBaseUrl: config.apiBaseUrl,
          hotSearchListUrl: '/search/hot',
          historyList: [],
      }
    },

    created() {
        // 获取热门搜索列表
        this.getHotSearchList()
    },

    mounted() {
        // 获取localStorage并赋值给historyList
        this.getHistory()
    },

    methods: {
        // 获取热门搜索列表
        getHotSearchList(){
            this.axios.get( this.apiBaseUrl + this.hotSearchListUrl ).then( e => {
                if( e.data.code != 200 ){
                    return console.log('热搜请求失败')
                }
                this.hotSearchList = e.data.result.hots
                // console.log(this.hotSearchList)
            } )
        },
        
        // 获取localStorage并赋值给historyList
        getHistory() {
            let history = localStorage.getItem('history')
            if(history) {
                this.historyList = JSON.parse(history)
                // console.log('historyList: ',this.historyList)
            }
            else
                return
        },

        // 删除localStorage
        delHistory(word) {
            if( this.hasEl(this.historyList,word) ) {
                let newList = []
                this.historyList.forEach(item => {
                    if(item != word) {
                        newList.push(item)
                    }
                })
                this.historyList = newList
                localStorage.setItem('history', JSON.stringify(this.historyList) )
            }
            else
                return
        },

        // 跳转searchRes页面,并添加localStorage,并修改搜索框的value
        search(word){
            console.log('word: '+word)

            document.querySelector('#search').value = word

            this.addHistory(word)

            this.$store.commit('searchedWord',word)

            this.$router.replace({ name: 'searchRes' })

        },

        // 添加localStorage
        addHistory(word) {
            if( this.hasEl(this.historyList,word) ) return
            this.historyList.push(word)
            localStorage.setItem('history', JSON.stringify(this.historyList) )
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

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
.hotSearchBox{
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
    cursor: pointer;
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
    cursor: pointer;
}
.delIcon{
    display: inline-block;
    width: 30px;
    height: 45px;
    cursor: pointer;
}
.delIcon i{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
}
</style>