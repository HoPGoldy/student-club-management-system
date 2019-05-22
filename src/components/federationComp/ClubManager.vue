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
                    el-button(type="danger" v-if="!clubItem.deleteFlag" @click="banClub(clubItem.id)") 封禁社团
                    el-button(type="warning" v-if="clubItem.deleteFlag" @click="unbanClub(clubItem.id)") 解封社团
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
                console.log("TCL: fetch -> resp", resp)
                this.clubDatas = resp.data
            })
        },
        chengePrincipal(clubId) {
            this.changePrincipalVisable = !this.changePrincipalVisable
            this.selectedClubId = clubId
            this.$get('/v1/club/getMemberById', {
                clubId: clubId
            }).then(resp => {
                this.clubMembers = resp.data
                this.newPrincipal = resp.data.length > 0 ? resp.data[0] : ''
            })
            console.log('更换负责人', clubId)
        },
        unbanClub(clubId) {
            this.$confirm('确认解封该社团？').then(resp => {
                this.$post('/v1/federation/unBan', {
                    clubId: clubId,
                }).then(resp => {
                    this.$message({
                        message: resp.data.msg,
                        type: resp.data.state ? 'success' : 'error',
                        showClose: true
                    })
                    this.fetch()
                })
            })
        },
        banClub(clubId) {
            this.$confirm('确认封禁该社团？').then(resp => {
                this.$post('/v1/federation/ban', {
                    clubId: clubId,
                }).then(resp => {
                    this.$message({
                        message: resp.data.msg,
                        type: resp.data.state ? 'success' : 'error',
                        showClose: true
                    })
                    this.fetch()
                })
            })
            
            console.log('封禁社团', clubId)
        },
        submitPrincipal() {
            this.$post('/v1/federation/chengePrincipal', {
                clubId: this.selectedClubId,
                memberId: this.newPrincipal
            }).then(resp => {
                this.$message({
                    message: resp.data.msg,
                    type: resp.data.state ? 'success' : 'error',
                    showClose: true
                })
            })
        }
    },
    mounted() {
        this.fetch()
    }
}
</script>
