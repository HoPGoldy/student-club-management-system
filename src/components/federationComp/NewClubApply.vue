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
        el-table-column(prop="organizerName" label="申请人" align="center")
        el-table-column(prop="clubName" label="社团名" align="center")
        el-table-column(prop="clubIntroduce" label="社团介绍" align="center")
        el-table-column(label="操作" align="center")
            template(slot-scope="scope")
                el-button(type="text" @click="showDetail(scope.$index)") 审核
    el-dialog(title="申请详情" :visible.sync="detailVisable")
        .line
            .line-title 申请人
            .line-content {{detailData.organizerName}}
        .line
            .line-title 新社团名称
            .line-content {{detailData.clubName}}
        .line
            .line-title 社团介绍
            .line-content {{detailData.clubIntroduce}}
        .opreation
            el-button(type="primary" @click="agree(detailData.applyId)") 同意
            el-button(type="danger" @click="refuse(detailData.applyId)") 驳回
</template>

<script>
export default {
    name: 'NewClubApply',
    data: () => ({
        applyDatas: [],
        detailVisable: false,
        detailData: {
            organizerName: '--',
            clubName: '--',
            clubIntroduce: '--',
            applyId: null
        }
    }),
    methods: {
        fetch() {
            this.$get('/v1/federation/getNewClubApply').then(resp => {
                console.log(resp)
                this.applyDatas = resp.data
            })
        },
        showDetail(applyIndex) {
            this.detailVisable = !this.detailVisable
            this.detailData = this.applyDatas[applyIndex]
        },
        agree(applyId) {
            console.log('同意申请', applyId)
            this.detailVisable = false
            this.$post('/v1/federation/dealNewClubApply', {
                applyId: applyId,
                opinion: 'agree'
            }).then(resp => {
                this.$message({
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error'
                })
                this.fetch()
            })
        },
        refuse(applyId) {
            console.log('拒绝申请', applyId)
            this.detailVisable = false
            this.$post('/v1/federation/dealNewClubApply', {
                applyId: applyId,
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
    