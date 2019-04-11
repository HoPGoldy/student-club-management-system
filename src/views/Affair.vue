<style lang="stylus" scoped>
.container
    display flex
    flex-direction column
    align-items center
.func-list
    width 50%
    display flex
    flex-flow row warp
    align-items center
    .func
        width 48%
        border 1px solid #e6e6e6
        margin 16px
        .clearfix
            text-align left
        .el-button
            heigth 35px
            line-height 35px
.title
    font-size 24px
    font-weight bolder
    padding-bottom 16px
</style>

<template lang="pug">
.container 
    .func-list
        el-card.func(v-for="func in funcList" class="box-card")
            .clearfix(slot="header")
                span.title {{func.title}}
                el-button(style="float: right; padding: 3px 0" type="text") 修改
</template>

<script>
export default {
    name: 'Affair',
    data: () => ({
        funcList: [
            {
                title: '规章制度',
                getPath: '',
            },
            {
                title: '人员安排',
                getPath: '',
            }
        ]
    }),
    methods: {
        
    }
}
</script>
