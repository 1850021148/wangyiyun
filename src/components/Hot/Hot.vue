<template>
    <div>
        <Banner :bannerData="bannerData"></Banner>
        <LaziList :songsData="songsData"></LaziList>
    </div>
</template>

<script>
import config from '../../config.js'
import Banner from './Banner/Banner.vue'
import LaziList from './LazyList/LazyList.vue'
export default {
    data () {
      return {
          apiBaseUrl: config.apiBaseUrl,
          bannerUrl: '/banner?type=1',
          songsUrl: '/personalized/newsong',
          bannerData: null, // url,pic,bannerId
          songsData: null,
      }
    },

    created(){
        this.axios.all( [ this.getBannerData(), this.getSongsData()] )
        .then( this.axios.spread( (res1,res2) => {
            this.bannerData = res1.data.banners
            this.songsData = res2.data.result
        } ) )
    },

    methods: {
        getSongsData(){
            return this.axios.get( this.apiBaseUrl + this.songsUrl )
        },
        getBannerData(){
            return this.axios.get( this.apiBaseUrl + this.bannerUrl )
        }
    },

    components: {
        Banner,
        LaziList,
    },
}
</script>

<style scoped>
</style>