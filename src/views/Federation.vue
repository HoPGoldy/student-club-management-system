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
    padding-top 32px
    width 55%
</style>

<template lang="pug">
.container
    .header
        span.title {{compMap[compName]}}
        el-radio-group(v-model="compName")
            el-radio-button(label="ClubManager") 社团管理
            el-radio-button(label="NewClubApply") 新社团申请
            el-radio-button(label="NewActivityApply") 活动申请
    .content
        keep-alive
            components(:is="compName")
</template>

<script>
import FederationComp from '../components/federationComp'
export default {
    name: 'Federation',
    data: () => ({
        compName: 'ClubManager',
        compMap: {
            ClubManager: '社团管理',
            NewClubApply: '新社团申请',
            NewActivityApply: '活动申请'
        }
    }),
    components: { ...FederationComp },
    methods: {
        
    }
}
</script>
