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
.go-back-button
    position fixed
    top 76px
    left 16px
</style>

<template lang="pug">
.container
    .header
        span.title 活动详情
        el-button(type="primary" @click="joinActivity") 加入活动
    .content
        .line
            .line-title 活动名称
            .line-content {{activityData.name}}
        .line
            .line-title 活动简介
            .line-content {{activityData.introduce}}
        .line
            .line-title 活动内容
            .line-content {{activityData.content}}
        .line
            .line-title 活动地点
            .line-content {{activityData.place}}
        .line
            .line-title 活动日期
            .line-content {{activityData.startDate}} 到 {{activityData.endDate}}
        .line
            .line-title 参加人员
            .line-content
                li(v-for="people in activityData.member") {{people}}
    el-button.go-back-button(@click="$router.back()") 返回上一级
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
        fetch() {
            this.$get('/v1/activity/getDetailById', {
                activityId: this.activityId
            }).then(resp => {
                // console.log(resp.data)
                this.activityData = resp.data
            })
        },
        joinActivity() {
            this.$confirm('确认要加入活动么？').then(resp => {
                return this.$post('/v1/activity/joinActivity', {
                    activityId: this.activityId,
                    userId: this.session.token
                })
            }).then(resp => {
                this.$message({
                    showClose: true,
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error'
                })
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
