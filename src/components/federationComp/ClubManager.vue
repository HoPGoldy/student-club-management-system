<style lang="stylus" scoped>
.container
    width 100%
    .opreation
        padding-top 16px
</style>

<template lang="pug">
.container
    el-collapse(v-model="activeNames" accordion)
        el-collapse-item(v-for="clubItem, index in clubDatas" :title="clubItem.name" :name="index")
            .club
                .info
                    el-table(:data="[clubItem]")
                        el-table-column(prop="name" label="社团名" align="center")
                        el-table-column(prop="principal" label="负责人" align="center")
                        el-table-column(prop="memberNum" label="当前人数" align="center")
                .opreation
                    el-button(type="primary" @click="chengePrincipal(clubItem.id)") 更换负责人
                    el-button(@click="$router.push(`/main/ClubPage/${clubId}`)") 社团详情
                    el-button(type="danger" @click="removeClub(clubItem.id)") 删除社团
</template>

<script>
export default {
    name: 'ClubManager',
    data: () => ({
        activeNames: [],
        clubDatas: []
    }),
    methods: {
        fetch() {
            this.$get('/v1/club/getList').then(resp => {
                this.clubDatas = resp.data.data
                console.log(this.clubDatas)
            })
        },
        chengePrincipal(clubId) {
            console.log('更换负责人', clubId)
        },
        removeClub(clubId) {
            console.log('删除社团', clubId)
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
