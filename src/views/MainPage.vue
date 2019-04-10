<style lang="stylus" scoped>
.title
    position fixed
    top 12px
    left 12px
    font-size 26px
    font-weight bolder
    color #D6D6D6
.login
    position fixed
    height 60px
    top 0px 
    right 18px
    white-space nowrap
    .avatar
        cursor pointer
        margin-top 18px
        width 26px
        height 26px
        border-radius 50%
        position relative
.el-main
    height calc(100% - 80px)
    overflow auto
</style>

<template lang="pug">
el-container
    el-header
        el-menu(default-active="/main/UserCenter" 
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                mode="horizontal"
                :router="true")
            el-menu-item(index="/main/UserCenter") 个人中心
            el-menu-item(index="/main/ClubList") 社团列表
            el-submenu(index="2") 
                template(slot="title") 社团管理
                el-menu-item(index="/main/Affair") 事务管理
                el-menu-item(index="/main/Activity") 活动管理
                el-menu-item(index="/main/Finance") 财务管理
            el-menu-item(index="/main/Federation") 社联管理
    el-main
        router-view(to="main" append)
    el-dropdown.login(@command='userAction')
        img.avatar(src="../images/avatar.png")
        el-dropdown-menu(slot='dropdown')
            el-dropdown-item(command='userSetting') 个人设置
            el-dropdown-item(command='logout') 登出
    .title 社团管理系统
            
</template>

<script>
export default {
    name: 'MainPage',
    data: () => ({
        userInfo: {
            name: '开发用户'
        }
    }),
    methods: {
        userAction(key) {
            switch (key) {
                case 'logout':
                    this.logout()
                break
            }
        },
        logout() {
            console.log('登出')
            
            this.$router.push('/login')
        }
    }
}
</script>
