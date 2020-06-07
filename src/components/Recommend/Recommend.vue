<template>
    <div>
        <RecSongList class="recSongList"></RecSongList>
        <NewSongList class="newSongList"></NewSongList>
        <Bottom></Bottom>
    </div>
</template>

<script>
import RecSongList from '../RecSongList/RecSongList.vue'
import NewSongList from '../NewSongList/NewSongList.vue'
import Bottom from '../Bottom/Bottom.vue'

export default {
    data () {
      return {

      }
    },

    methods: {

    },

    components: {
        RecSongList,
        NewSongList,
        Bottom,
    },
}
</script>

<style scoped>
.recSongList{
    padding-top: 20px;
}
</style>