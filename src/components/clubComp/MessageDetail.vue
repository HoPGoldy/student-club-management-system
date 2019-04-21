<style lang="stylus" scoped>
.header
    width 60%
    display flex
    flex-flow row nowrap
    align-items center
    justify-content space-between
    padding-bottom 16px
    border-bottom 2px solid #888
    .title
        font-size 24px
        font-weight bolder
.content
    width 50%
    .line
        display flex
        flex-flow row nowrap
        align-items baseline
        justify-content flex-start
        width 90%
        text-align left
        padding 16px
        border-bottom 5px solid #e5e5e5
        .line-title
            font-size 20px
            font-weight bolder
            padding-right 16px
            width 20%
        .line-content
            font-size 18px
            padding-left 100px
            width 80%
.go-back-button
    position fixed
    top 76px
    left 16px
</style>

<template lang="pug">
.container 
    .header
        span.title 消息详情
    .content
        .line
            .line-title 消息名称
            .line-content {{newDetail.title}}
        .line
            .line-title 正文
            .line-content {{newDetail.content}}
        .line
            .line-title 发布社团
            .line-content {{newDetail.clubName}}
        .line
            .line-title 发布者
            .line-content {{newDetail.author}}
        .line
            .line-title 发布日期
            .line-content {{newDetail.date}}
    GoBack.go-back-button
</template>

<script>
import GoBack from 'common/GoBack.vue'
export default {
    name: 'MessageDetail',
    data: () => ({
        newDetail: {
            title: '--',
                clubName: '--',
                content: '--',
                date: '--',
                author: '--'
        }
    }),
    props: {
        msgId: String
    },
    components: { GoBack },
    methods: {
        fetch() {
            this.$get('/v1/new/getDetailById', {
                messageId: this.msgId
            }).then(resp => {
                this.newDetail = resp.data
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
