<template>
    <ul class="suggests-box">

        <li class="first" @click="search(inputValue)">
            搜索 "{{ inputValue }}"
        </li>

        <div class="other" v-if="suggests" >
            <li 
              v-for="(item,index) in suggests.allMatch" :key="index"
              @click="search(item.keyword)"
            >
                <i></i>
                <span>{{ item.keyword }}</span>
            </li>
        </div>
    </ul>
</template>

<script>
import config from '../../../config.js'
export default {
    data () {
      return {
          apiBaseUrl: config.apiBaseUrl,
          searchSuggestURL: '/search/suggest',
          suggests: null,
      }
    },

    created() {
        this.getSearchSuggest()
    },

    props: [
        'inputValue',
    ],

    watch: {
        inputValue(newVal) {
            this.getSearchSuggest()
        },
    },

    methods: {
        getSearchSuggest() {
            let result
            let keyword = this.inputValue
            if(!keyword) return
            this.axios.get( `${this.apiBaseUrl+this.searchSuggestURL}?keywords= ${keyword}&type=mobile` )
            .then( res => {
                console.log('suggest: ',res.data.result)
                this.suggests = res.data.result
            })
            .catch( err => {})
        },
        search(keyword) {
            this.$emit('search',keyword)
        },
    },

    components: {},
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}

.suggests-box{
    padding: 0 10px;
}

.suggests-box li{
    display: flex;
    height: 30px;
    line-height: 30px;
}

.first{
    color: #09f;
    border-bottom: .5px solid #eee;
}

.suggests-box li>span{
    flex: 1;
    display: inline-block;
    border-bottom: .5px solid #eee;
    position: relative;
    left: 10px;
}
.suggests-box i{
    display: inline-block;
    margin-top: 10px;
    width: 15px;
    height: 15px;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
}
</style>