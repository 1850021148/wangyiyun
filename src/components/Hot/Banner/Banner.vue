<template>
    <div>
        <div class="slide" ref="slide">
            <div class="slide-wrapper">
                <li class="slide-item" v-for="item in bannerData" :key="item.bannerId">
                    <a :href="item.url"><img :src="item.pic" ref="img"/></a>
                </li>
            </div>
            <ul class="dotBox">
                <li :class="{ dot: true, active: index == page }" v-for="(item,index) in bannerData" :key="item.bannerId"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide)
export default {
    data () {
      return {
          page: 0,
      }
    },

    props: [
        'bannerData',
    ],

    watch: {
        bannerData(){
            setTimeout(()=>{
                this.init()
                this.timer = setTimeout(()=>{
                    this.slide.next()
                },3000)
                this.autoScroll()
                this.slide.on('slideWillChange',(page)=>{
                    this.page = page.pageX
                })
            },20)
        }
    },

    methods: {
        init(){
            this.slide = new BScroll(this.$refs.slide,{
                scrollX: true,
                scrollY: false,
                slide: {
                    loop: true,
                    threshold: 100,
                },
                useTransition: true,
                momentum: false,
                bounce: false,
                stopPropagation: true,
                probeType: 2
            })
        },
        autoScroll(){
            this.slide.on('scrollEnd',()=>{
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.slide.next()
                },3000)
            })
            this.slide.on('beforeScrollStart',()=>{
                clearTimeout(this.timer)
            })
            this.slide.on('touchEnd',()=>{
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.slide.next()
                },3000)
            })
        },
    },

    components: {},
}
</script>

<style scoped>
.slide{
    width: 100%;
    overflow: hidden;
    position: relative;
}
.slide-item{
    float: left;
}
.slide-item a{
    display: inline-block;
    z-index: 10;
}
.slide-item img{
    width: 100%;
}

.dotBox{
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
}
.dot{
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: white;
    float: left;
    margin: 0 3px;
    opacity: .75;
}
.active{
    background: red;
}
</style>