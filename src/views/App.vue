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
  router-view

</template>

<script>
export default {
    name: 'app',
    data: () => ({
        
    })
}
</script>
