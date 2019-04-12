<style lang="stylus" scoped>
.go-back-button
    position fixed
    top 76px
    left 16px
</style>

<template lang="pug">
.container 
    h1 消息详情页 {{msgId}}
    el-button.go-back-button(@click="$router.back()") 返回上一级
</template>

<script>
import GoBack from 'common/GoBack.vue'
export default {
    name: 'MessageDetail',
    data: () => ({

    }),
    props: {
        msgId: String
    },
    components: { GoBack },
    methods: {
        
    }
}
</script>
