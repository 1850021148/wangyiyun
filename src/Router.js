import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './components/Index/Index.vue'
import PlayMusic from './components/PlayMusic/PlayMusic.vue'
import Recommend from './components/Recommend/Recommend.vue'
import Hot from './components/Hot/Hot.vue'
import Search from './components/Search/Search.vue'
import HotSearch from './components/Search/HotSearch/HotSearch.vue'
import RecSearch from './components/Search/RecSearch/RecSearch.vue'
import SearchRes from './components/Search/SearchRes/SearchRes.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/play-music',
            components: {
                default: PlayMusic,
            }
        },
        {
            path: '/index',
            components: {
                default: Index,
            },
            children: [
                {
                    path: '',
                    redirect: 'recommend'
                },
                {
                    name: 'recommend',
                    path: 'recommend',
                    components: {
                        indexBody: Recommend
                    }
                },
                {
                    name: 'hot',
                    path: 'hot',
                    components: {
                        indexBody: Hot
                    }
                },
                {
                    name: 'search',
                    path: 'search',
                    components: {
                        indexBody: Search
                    },
                    children: [
                        {
                            path: '',
                            redirect: 'hotSearch'
                        },
                        {
                            name: 'hotSearch',
                            path: 'hotSearch',
                            components: {
                                searchBox: HotSearch
                            }
                        },
                        {
                            name: 'recSearch',
                            path: 'recSearch',
                            components: {
                                searchBox: RecSearch
                            }
                        },
                        {
                            name: 'searchRes',
                            path: 'searchRes',
                            components: {
                                searchBox: SearchRes
                            }
                        },
                    ]
                }
            ]
        },
    ]
})