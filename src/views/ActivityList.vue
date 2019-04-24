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
.activity-list
    width 60%
   
</style>

<template lang="pug">
.container
    .header
        span.title 活动列表
        span 快去参加你最喜欢的活动吧！
    .activity-list
        el-table(:data="activityData")
            el-table-column(prop="title" label="活动名" width="150")
            el-table-column(prop="introduce" label="介绍" align="center" )
            el-table-column(prop="state" label="状态" align="center" width="100")
                template(slot-scope="scope")
                    el-tag(:type="scope.row.stateType") {{scope.row.stateContent}}
            el-table-column(prop="date" label="日期" align="center" width="100")
            el-table-column(label="操作" align="center" width="150")
                template(slot-scope="scope")
                    el-button(type="text" @click="$router.push(`ActivityDetail/${scope.row.id}`)") 详情
</template>

<script>
export default {
    name: 'ActivityList',
    data: () => ({
        activityData: []
    }),
    methods: {
        fetch() {
            this.$get('/v1/user/getAcitvityById', {
                    userId: this.session.token
            }).then(resp => {
                console.log(resp)
                this.activityData = resp.data.map(item => {
                    item.stateContent = this.config.activityState[item.state].content
                    item.stateType = this.config.activityState[item.state].type
                    return item
                })
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
