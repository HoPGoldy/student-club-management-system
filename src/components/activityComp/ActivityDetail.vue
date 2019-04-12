<style scoped lang="stylus">
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
            
</style>

<template lang="pug">
.container
    .header
        span.title 活动详情
    .content
        .line
            .line-title 活动名称
            .line-content 活动1
        .line
            .line-title 活动简介
            .line-content 如果我说我每次争取留在教室最后总是最后一个走，洗澡吃饭尽量一气呵成
        .line
            .line-title 活动内容
            .line-content 如果我说我每次争取留在教室最后总是最后一个走，洗澡吃饭尽量一气呵成，熬着最晚的夜，调起最早的闹钟，迈起最艰难的步伐，抗起吃不消日日的腹痛，望着看不清的试题......所有所有的精神支柱不过一个你啊!对啊你很重要，你在我这里的分量远远超越了你的想象。
        .line
            .line-title 活动地点
            .line-content 金都华庭13号楼
        .line
            .line-title 活动日期
            .line-content 2019-4-12 到 2019-4-12
        .line
            .line-title 参加人员
            .line-content
                li(v-for="people in activityData.members")
</template>

<script>
export default {
    name: 'ActivityDetail',
    data() {
        return {
            activityData: {
                name: '--',
                place: '--',
                introduce: '--',
                content: '--',
                date: '--',
                member: []
            }
        }
    },
    props: { 
        activityId: String
    },
    methods: {

    },
}
</script>
