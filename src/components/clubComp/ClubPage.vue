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
        .operation
            margin-top 16px
            display flex
            flex-direction column
            border 1px solid #e5e5e5
            border-left 5px solid #FFFCA6
            padding 16px
            .el-button
                width 100%
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
.operation-list
    display flex
    flex-direction column
    align-items flex-end
    .el-button
        margin-bottom 16px
.sub-title
    font-size 24px
    font-weight bolder
    padding-bottom 16px
.el-card
    margin 8px
    cursor pointer
.clearfix:after 
    display table
    content ""
    clear both
.go-back-button
    position fixed
    top 76px
    left 16px
</style>

<template lang="pug">
.container
    .header
        el-carousel(:interval="4000" type="card" height="300px")
            el-carousel-item(v-for="picPath in picPaths")
                el-image(style="width:100%; height:100%" :src="picPath" fit="cover")
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
                .regulation-line(v-for="item in regulations" )
                    span {{item}}
            .operation(v-if="visable.list")
                .sub-title 行动
                .operation-list
                    template(v-if="visable.configClubButton")
                        el-button(@click="$router.push(`/main/Affair`)") 社团管理
                    template(v-if="visable.joinClubButton")
                        el-button(type="primary" @click="joinClub") 加入社团
                    template(v-if="visable.exitClubButton")
                        el-button(type="danger" @click="exitClub") 退出社团
                
        .new-list
            el-card(v-for="newInfo in news" shadow="hover" @click.native="$router.push(`/main/MessageDetail/${newInfo.id}`)")
                .clearfix(slot="header")
                    span(style="float: left; padding: 3px") {{newInfo.title}}
                    span(style="float: right; padding: 3px") {{newInfo.date}}
                .message {{newInfo.content}}
            template(v-if="news.length == 0")
                h1(style="color:#888") 暂无新消息
        .right-panel
            .acitvity-list
                .sub-title(style="border-bottom: 1px solid #e5e5e5") 活动
                .acitvity-line(v-for="item in acitvitys" @click="$router.push(`/main/ActivityDetail/${item.id}`)")
                    span.acitvity-title {{item.title}}
                    el-tag(style="float: right;" :type="item.stateType") {{item.stateContent}}
                template(v-if="acitvitys.length == 0")
                    h4(style="color:#888") 暂无活动
    el-dialog(title="规章制度" :visible.sync="regulationVisible")
        div(v-for="item in regulations") {{item}}
    el-button.go-back-button(@click="$router.back()") 返回上一级
</template>

<script>
import TotalPics from '../../images/clubImages'
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
            visable: {
                list: false,
                joinClubButton: false,
                exitClubButton: false,
                configClubButton: false
            },
            regulationVisible: false,
            totalPics: { ...TotalPics },
            // 临时存放目录
            picPaths: []
        }
    },
    props: {
        clubId: String,
    },
    methods: {
        fetch() {
            this.$get('/v1/club/getInfoById', {
                clubId: this.clubId
            }).then(resp => {
                this.clubInfo = resp.data
            })

            this.$get('/v1/club/getRegulationById', {
                clubId: this.clubId
            }).then(resp => {
                this.regulations = resp.data
            })

            this.$get('/v1/club/getNewById', {
                clubId: this.clubId
            }).then(resp => {
                // console.log('resp', resp)
                this.news = resp.data
            })

            this.$get('/v1/club/getAcitvityById', {
                clubId: this.clubId
            }).then(resp => {
                this.acitvitys = resp.data.map(item => {
                    item.stateContent = this.config.activityState[item.state].content
                    item.stateType = this.config.activityState[item.state].type
                    return item
                })
                // console.log(this.acitvitys)
            })
        },
        setRandPic(picNum) {
            const MAX_PIC_NUM = this.config.maxPicNum
            let picPaths = new Array(picNum).fill('')

            this.picPaths = picPaths.map(() => {
                let picName = Math.floor(Math.random() * MAX_PIC_NUM + 1)
                return this.totalPics[picName]
            })
        },
        setPermission() {
            let permission = this.session.permission
            if (permission.level != 2) {
                this.$get('/v1/user/getUserInfoByToken', {
                    token: this.session.token
                }).then(resp => {
                    let joined = false
                    resp.data.addedClub.map(item => {
                        if (item.id == this.clubId && !joined) {
                            this.setVisable('exitClubButton', true)
                            joined = true
                        }
                    })
                    if (!joined) {
                        this.setVisable('joinClubButton', true)
                    }
                })
            }
            else if (permission.clubId == this.clubId) {
                this.setVisable('configClubButton', true)
            }
        },
        // 用于显示行动按钮时顺便显示行动标签框
        setVisable(key, value) {
            if (value) {
                this.$set(this.visable, 'list', true)
            }
            this.$set(this.visable, key, value)
        },
        joinClub() {
            this.$confirm('确认要加入该社团么？').then(resp => {
                this.$post('/v1/user/sendJoinApply', {
                    clubId: this.clubId,
                    userId: this.session.token
                }).then(resp => {
                    this.$message({
                        message: resp.data.msg,
                        type: resp.data.state ? 'success' : 'error'
                    })
                })
            })
        },
        exitClub() {
            this.$confirm('确认要退出该社团么？').then(resp => {
                this.$post('/v1/user/sendExitApply', {
                    clubId: this.clubId,
                    userId: this.session.token
                }).then(resp => {
                    this.$message({
                        message: resp.data.msg,
                        type: resp.data.state ? 'success' : 'error'
                    })
                })
            })
        }
    },
    mounted() {
        if (this.clubId) {
            this.fetch()
            this.setPermission()
            this.setRandPic(3)
        }
        else {
            this.$message.error('跳转失败，未发现该社团')
        }
    }
}
</script>
