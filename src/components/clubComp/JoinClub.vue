<style lang="stylus" scoped>
.container
    width 100%
.func
    width 100%
    border 1px solid #e6e6e6
    margin 16px
    .clearfix
        text-align left
        .title
            font-size 24px
            font-weight bolder
            padding-bottom 16px
    .el-button
        heigth 35px
        line-height 35px
</style>

<template lang="pug">
.container
    el-card.func(class="box-card" shadow="hover")
        .clearfix(slot="header")
            span.title 加入社团申请
        .func-content()
            el-table(:data="joinApplyDatas")
                el-table-column(prop="name" label="申请人" align="center")
                el-table-column(prop="reason" label="申请理由" align="center")
                el-table-column(label="操作" align="center")
                    template(slot-scope="scope")
                        el-button(type="text" @click="dealApply(scope.row.id, 'agree')") 同意
                        el-button(type="text" @click="dealApply(scope.row.id, 'refuse')") 驳回
</template>

<script>
export default {
    name: 'JoinClub',
    data: () => ({
        joinApplyDatas: []
    }),
    methods: {
        fetch() {
            this.$get('/v1/club/getJoinApplyById').then(resp => {
                this.joinApplyDatas = resp.data.data
            })
        },
        dealApply(memberId, opinion) {
            this.$post('/v1/club/dealJoinApply', {
                memberId: memberId,
                opinion: opinion
            }).then(resp => {
                this.$message({
                    message: resp.data.data.msg,
                    type: resp.data.data.state ? 'success' : 'error'
                })
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
