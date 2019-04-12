<style lang="stylus" scoped>
.go-back-button
    position fixed
    top 76px
    left 16px
</style>

<template lang="pug">
el-button.go-back-button(@click="$router.back()") 返回上一级
</template>

<script>
export default {
    name: 'templete',
    data: () => ({

    }),
    methods: {
        
    }
}
</script>
