<style scoped lang="stylus">
.container
    display flex
    flex-direction column
    align-items center
.header
    width 70%
    .el-carousel__item
        color #475669
        line-height 200px
        margin 0
        &:nth-child(2n)
            background-color #99a9bf
        &:nth-child(2n+1)
            background-color #d3dce6
.content
    display flex
    flex-direction row
    justify-content center
    width 100%
    .left-panel
        width 20%
        margin-top 8px
        .club-info
            border 1px solid #e5e5e5
            border-left 5px solid #FFFCA6
            padding 16px
            .club-name
                font-size 24px
                font-weight bolder
                margin 8px 0px
            .info-list-item
                font-weight bolder
        .regulation-info
            cursor pointer
            margin-top 16px
            border 1px solid #e5e5e5
            border-left 5px solid #FFFCA6
            padding 16px
            .regulation-line
                text-align left
                margin-top 8px
                border-top 1px solid #888
                padding 8px
    .new-list
        width 30%
    .right-panel
        width 20%
        margin-top 8px
        .acitvity-list
            border 1px solid #e5e5e5
            border-left 5px solid #FFFCA6
            padding 16px
            .acitvity-line
                height 30px
                padding 12px
                border-bottom: 1px solid #e5e5e5
                text-align left
                cursor pointer
                &:hover
                    background-color #e5e5e5
                    transition background-color 0.4s
                .acitvity-title
                    font-size 18px
                    font-weight bolder
                    line-height 30px
                
.sub-title
    font-size 24px
    font-weight bolder
    padding-bottom 16px
.el-card
    margin 8px
.clearfix:after 
    display table
    content ""
    clear both
</style>

<template lang="pug">
.container
    .header
        el-carousel(:interval="4000" type="card" height="300px")
            el-carousel-item(v-for="item in 6" :key="item")
    .content
        .left-panel
            .club-info
                .club-name {{clubInfo.name}}
                div
                    span 社团负责人 
                    span.info-list-item {{clubInfo.principal}}
                div
                    span 当前人数 
                    span.info-list-item {{clubInfo.memberNum}}
            .regulation-info(@click="regulationVisible = !regulationVisible")
                .sub-title 规章制度
                .regulation-line(v-for="item in regulations")
                    span {{item}}
        .new-list
            el-card(v-for="newInfo in news" shadow="hover")
                .clearfix(slot="header")
                    span(style="float: left; padding: 3px") {{newInfo.title}}
                    span(style="float: right; padding: 3px") {{newInfo.date}}
                .message {{newInfo.message}}
        .right-panel
            .acitvity-list
                .sub-title(style="border-bottom: 1px solid #e5e5e5") 活动
                .acitvity-line(v-for="item in acitvitys")
                    span.acitvity-title {{item.title}}
                    el-tag(style="float: right;" :type="item.stateType") {{item.stateContent}}
    el-dialog(title="规章制度" :visible.sync="regulationVisible")
        div(v-for="item in regulations") {{item}}
</template>

<script>
export default {
    name: 'ClubPage',
    data() {
        return {
            news: [],
            clubInfo: {
                name: '--',
                introduce: '--',
                memberNum: '--'
            },
            regulations: [],
            acitvitys: [],
            regulationVisible: false
        }
    },
    props: {
        clubId: String,
    },
    methods: {
        fetch() {
            this.$get('/v1/club/getInfoById').then(resp => {
                this.clubInfo = resp.data.data
            })

            this.$get('/v1/club/getRegulationById').then(resp => {
                this.regulations = resp.data.data
            })

            this.$get('/v1/club/getNewById').then(resp => {
                this.news = resp.data.data
            })

            this.$get('/v1/club/getAcitvityById').then(resp => {
                this.acitvitys = resp.data.data.map(item => {
                    switch(item.state) {
                        case 1:
                            item.stateContent = '准备中'
                            item.stateType = 'success'
                        break
                        case 2:
                            item.stateContent = '进行中'
                            item.stateType = ''
                        break
                        case 3:
                            item.stateContent = '已结束'
                            item.stateType = 'info'
                        break
                    }
                    return item
                })
            })
        }
    },
    mounted() {
        if (this.clubId) {
            this.fetch()
        }
        else {
            this.$message.error('跳转失败，未发现该社团')
        }
    }
}
</script>
