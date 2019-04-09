<style lang="stylus">
html, body
    height 100%
    width 100%
    margin 0px
#app 
    height 100%
    width 100%
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
.el-container
    height 100%
    .el-header
        padding 0px
    .el-menu
        display flex
        flex-direction row
        justify-content center
</style>

<template lang="pug">
#app
  el-container
    el-header
        el-menu(default-active="./UserCenter" 
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
                mode="horizontal"
                :router="true")
            el-menu-item(index="/UserCenter") 个人中心
            el-submenu(index="2") 
                template(slot="title") 社团管理
                el-menu-item(index="/Affair") 事务管理
                el-menu-item(index="/Activity") 活动管理
                el-menu-item(index="/Finance") 财务管理
            el-menu-item(index="/Federation") 社联管理
        el-main
            router-view
    
</template>

<script>
export default {
    name: 'app',
    data: () => ({
        
    })
}
</script>
