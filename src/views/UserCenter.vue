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
                    span.user-level {{userInfo.level}}
            .activity-info
                .activity-title 已加入的社团
                .added-club(v-for="club in userInfo.addedClub" @click="enterClub(club.id)")
                    span {{club.name}}
                    span(style="float: right;") >
        .new-list
            .msg(v-for="newInfo in news" style="position:relative")
                el-card(shadow="hover")
                    .clearfix(slot="header")
                        span(style="float: left; padding: 3px") {{newInfo.clubName}}
                        span(style="float: right; padding: 3px") {{newInfo.date}}
                    .message {{newInfo.message}}
                el-button.enter-msg-fix(icon="el-icon-d-arrow-right" circle @click="$router.push(`/main/MessageDetail/${newInfo.id}`)")
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
        }
    }),
    methods: {
        enterClub(clubId) {
            console.log('访问社团', clubId)
            this.$router.push(`/main/ClubPage/${clubId}`)
        }
    },
    mounted() {
        this.$get('/v1/user/getNews').then(resp => {
            this.news = resp.data.data
        })
        this.$get('/v1/user/getUserInfo').then(resp => {
            this.userInfo = resp.data.data
        })
    }
}
</script>
