<style lang="stylus" scoped>
.container
    width 100%
    .opreation
        padding-top 16px
    .el-dialog
        .el-button
            margin-left 16px
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
                    el-button(@click="$router.push(`/main/ClubPage/${clubItem.id}`)") 社团详情
                    el-button(type="danger" @click="removeClub(clubItem.id)") 删除社团
    el-dialog(title="更换负责人" :visible.sync="changePrincipalVisable")
        el-select(v-model='newPrincipal' placeholder='请选择新负责人')
            el-option(v-for='item in clubMembers' :label='item.label' :value='item.key')
        el-button(type="primary" @click="submitPrincipal()") 提交

</template>

<script>
export default {
    name: 'ClubManager',
    data: () => ({
        activeNames: [],
        clubDatas: [],
        clubMembers: [],
        selectedClubId: '',
        newPrincipal: '',
        changePrincipalVisable: false
    }),
    methods: {
        fetch() {
            this.$get('/v1/club/getList').then(resp => {
                this.clubDatas = resp.data.data
                console.log(this.clubDatas)
            })
        },
        chengePrincipal(clubId) {
            this.changePrincipalVisable = !this.changePrincipalVisable
            this.selectedClubId = clubId
            this.$get('/v1/club/getMemberById').then(resp => {
                this.clubMembers = resp.data.data
                this.newPrincipal = resp.data.data.length > 0 ? resp.data.data[0] : ''
            })
            console.log('更换负责人', clubId)
        },
        removeClub(clubId) {
            this.$confirm('确认删除该社团？该行为无法撤销').then(resp => {
                this.$post('/v1/club/remove', {
                    clubId: this.selectedClubId,
                    memberId: this.newPrincipal
                }).then(resp => {
                    this.$message({
                        message: resp.data.data.msg,
                        type: resp.data.data.state ? 'success' : 'error'
                    })
                })
            })
            
            console.log('删除社团', clubId)
        },
        submitPrincipal() {
            this.$post('/v1/federation/chengePrincipal', {
                clubId: this.selectedClubId,
                memberId: this.newPrincipal
            }).then(resp => {
                this.$message({
                    message: resp.data.data.msg,
                    type: resp.data.data.state ? 'success' : 'error'
                })
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
