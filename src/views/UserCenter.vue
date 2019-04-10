<style lang="stylus" scoped>
</style>

<template lang="pug">
.container 
    h1 个人中心
</template>

<script>
export default {
    name: 'UserCenter',
    data: () => ({

    }),
    methods: {
        
    },
    mounted() {
        this.$get('http://www.baidu.com').then(resp => {
            console.log(resp)
        })
    }
}
</script>
