<style lang="stylus" scoped>
.container
    width 100%
    .line
        display flex
        flex-flow row nowrap
        align-items baseline
        justify-content flex-start
        width 90%
        text-align left
        padding 16px
        border-bottom 2px solid #e5e5e5
        .line-title
            font-size 20px
            font-weight bolder
            padding-right 16px
            width 20%
        .line-content
            font-size 18px
            padding-left 100px
            width 80%
    .opreation
        padding-top 32px
        .el-button
            width 45%
</style>

<template lang="pug">
.container
    el-table(:data="applyDatas")
        el-table-column(prop="clubName" label="申请社团" align="center")
        el-table-column(prop="name" label="活动名" align="center")
        el-table-column(prop="startDate" label="申请时间" align="center")
        el-table-column(label="操作" align="center")
            template(slot-scope="scope")
                el-button(type="text" @click="showDetail(scope.$index)") 审核
    el-dialog(title="申请详情" :visible.sync="detailVisable")
        .line
            .line-title 活动名称
            .line-content {{detailData.name}}
        .line
            .line-title 活动简介
            .line-content {{detailData.introduce}}
        .line
            .line-title 活动内容
            .line-content {{detailData.content}}
        .line
            .line-title 活动地点
            .line-content {{detailData.place}}
        .line
            .line-title 活动日期
            .line-content {{detailData.startDate}} 到 {{detailData.endDate}}
        // .line
        //     .line-title 参加人员
        //     .line-content
        //         li(v-for="people in detailData.member") {{people}}
        .opreation
            el-button(type="primary" @click="agree(detailData.id)") 同意
            el-button(type="danger" @click="refuse(detailData.id)") 驳回
</template>

<script>
export default {
    name: 'NewActivityApply',
    data: () => ({
        applyDatas: [],
        detailVisable: false,
        detailData: {
            id: null,
            name: '--',
            place: '--',
            introduce: '--',
            content: '--',
            startDate: '--',
            endDate: '--',
            member: []
        }
    }),
    methods: {
        fetch() {
            this.$get('/v1/federation/getNewActivityApply').then(resp => {
                console.log(resp)
                this.applyDatas = resp.data
            })
        },
        showDetail(applyIndex) {
            this.detailVisable = !this.detailVisable
            
            this.detailData = this.applyDatas[applyIndex]
            console.log(this.detailData)
        },
        agree(activityId) {
            console.log('同意申请', activityId)
            this.detailVisable = false
            this.$post('/v1/federation/dealActivityApply', {
                activityId: activityId,
                opinion: 'agree'
            }).then(resp => {
                this.$message({
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error'
                })
                this.fetch()
            })
        },
        refuse(activityId) {
            console.log('拒绝申请', activityId)
            this.detailVisable = false
            this.$post('/v1/federation/dealActivityApply', {
                activityId: activityId,
                opinion: 'refuse'
            }).then(resp => {
                this.$message({
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error'
                })
                this.fetch()
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
    