<style lang="stylus" scoped>
.container
    display flex
    flex-direction column
    align-items center
    .header
        width 70%
        display flex
        flex-flow row nowrap
        align-items center
        justify-content space-between
        padding-bottom 16px
        border-bottom 2px solid #888
        .money
            font-size 24px

    .content
        width 70%
</style>

<template lang="pug">
.container 
    .header
        .money
            span 当前社团经费剩余 
            span(style="font-weight:bolder;") ￥100
        .opreation
            el-button(type="success") 收入
            el-button(type="warning") 支出
    .content
        el-table(:data="financeData")
            el-table-column(prop="value" label="金额")
            el-table-column(prop="type" label="类型")
            el-table-column(prop="date" label="日期")
            el-table-column(prop="info" label="用途")
</template>

<script>
export default {
    name: 'Finance',
    data: () => ({
        financeData: []
    }),
    methods: {
        
    },
    mounted() {
        this.$get('/v1/manager/getFinanceById').then(resp => {
            this.financeData = resp.data.data
        })
    }
}
</script>
