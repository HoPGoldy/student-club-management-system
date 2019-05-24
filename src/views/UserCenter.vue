<style lang="stylus" scoped>
.content
    width 60%
    padding 0px
    display flex
    flex-direction row
    justify-content center
    .new-list
        width 65%
        .enter-msg-fix
            position absolute
            top 42%
            right -50px
    .left-panel
        width 35%
        margin 8px 16px 0px 16px
        .user-info
            border 1px solid #e5e5e5
            border-left 5px solid #B8FFFD
            padding 16px
            .user-name
                font-size 24px
                font-weight bolder
                margin 8px 0px 
            .user-level
                font-weight bolder
        .activity-info
            margin-top 32px
            border 1px solid #e5e5e5
            border-left 5px solid #B8FFFD
            padding 16px
            .activity-title
                font-size 24px
                font-weight bolder
                margin-bottom 20px
            .added-club
                cursor pointer
                text-align left
                margin-top 8px
                border-top 1px solid #888
                padding 8px
        .operation
            margin-top 32px
            display flex
            flex-direction column
            border 1px solid #e5e5e5
            border-left 5px solid #B8FFFD
            padding 16px
            .el-button
                width 100%
.operation-list
    display flex
    flex-direction column
    align-items flex-end
    .el-button
        margin-bottom 16px
.background
    position fixed
    top -10%
    height 150%
    width 60%
    background-color rgba(255, 255, 255, 0.7)
.el-card
    margin 8px
.clearfix:after 
    display table
    content ""
    clear both
.sub-title
    font-size 24px
    font-weight bolder
    padding-bottom 16px
</style>

<template lang="pug">
.container
    .content 
        // .background
        .left-panel
            .user-info
                .welcome 欢迎回来
                .user-name {{userInfo.name}}
                div
                    span 当前身份 
                    span.user-level {{userInfo.levelName}}
            .activity-info
                .activity-title 已加入的社团
                .added-club(v-for="club in userInfo.addedClub" @click="enterClub(club.id)")
                    span {{club.name}}
                    span(style="float: right;") >
                template(v-if="userInfo.addedClub.length == 0")
                    h4(style="color:#888") 暂无已加入社团
            .operation(v-if="visable.list")
                .sub-title 行动
                .operation-list
                    template(v-if="visable.newClubButton")
                        el-button(type="primary" @click="$router.push('/main/newClub')") 新建社团
        .new-list
            .msg(v-for="newInfo in news" style="position:relative")
                el-card(shadow="hover")
                    .clearfix(slot="header")
                        span(style="float: left; padding: 3px") {{newInfo.clubName}}
                        span(style="float: right; padding: 3px") {{newInfo.date}}
                    .message {{newInfo.message}}
                el-button.enter-msg-fix(icon="el-icon-d-arrow-right" circle @click="$router.push(`/main/MessageDetail/${newInfo.id}`)")
            template(v-if="userInfo.addedClub.length == 0")
                h1(style="color:#888") 您还没有任何新消息，快去加入一个新社团吧
                el-button(type="primary" @click="$router.push('/main/ClubList')") 点此查看社团列表
            template(v-else-if="news.length == 0")
                h1(style="color:#888") 暂无新消息
</template>

<script>
export default {
    name: 'UserCenter',
    data: () => ({
        news: [],
        userInfo: {
            name: '--',
            level: '--',
            addedClub: []
        },
        visable: {
            list: false,
            newClubButton: false
        },
    }),
    methods: {
        setPermission() {
            let permission = this.session.permission
            console.log(permission)
            if (permission.level == 1) {
                
                this.setVisable('newClubButton', true)
            }
        },
        // 用于显示行动按钮时顺便显示行动标签框
        setVisable(key, value) {
            if (value) {
                this.$set(this.visable, 'list', true)
            }
            this.$set(this.visable, key, value)
        },
        enterClub(clubId) {
            console.log('访问社团', clubId)
            this.$router.push(`/main/ClubPage/${clubId}`)
        },
        fetch() {
            this.$get('/v1/user/getNews', {
                userId: this.session.token
            }).then(resp => {
                this.news = resp.data.reverse()
            })
            this.$get('/v1/user/getUserInfoByToken', {
                token: this.session.token
            }).then(resp => {
                this.userInfo = resp.data
                this.userInfo.levelName = this.config.levelMap[this.userInfo.level]
            })
        }
    },
    mounted() {
        this.fetch()
        this.setPermission()
    }
}
</script>
