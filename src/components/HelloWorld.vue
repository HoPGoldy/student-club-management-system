<template lang="pug">
  .container 
    h1 {{msg}}
    el-row
      el-col.intrdouce(:span="11")
        el-row
          b 项目介绍
          div 该项目使用vue作为框架，配合stylus以及pug方便快速开发。并集成了router，axios，element-ui，v-charts，leaflet等常用组件。
          b 注意事项
          div router定义在src/router.js中
          div axios定义在src/main.js中，绑定于$http属性上
          div 项目包含了vue-cli-service和eslint的配置文件
        el-row.element-show
          el-button 默认按钮
          el-button(type="primary", plain) 主要按钮
          el-button(type="primary", icon="el-icon-edit", circle)
          el-button(type="success", icon="el-icon-check", circle)
          el-button(type="warning", icon="el-icon-star-off", circle)
          el-button(type="danger", icon="el-icon-delete", circle)

          el-progress(:text-inside="true", :stroke-width="18", :percentage="30")
          el-progress(:text-inside="true", :stroke-width="18", :percentage="50", status="success")
          el-progress(:text-inside="true", :stroke-width="18", :percentage="80", color="rgba(142, 113, 199, 0.7)")

          el-input(placeholder="请输入内容", v-model="input")
            template(slot="prepend") Http:
          el-card(class="box-card")
            div(slot="header")
              span 卡片名称
              el-button(style="float: right; padding: 3px 0", type="text") 操作按钮
            div(v-for="o in 4", :key="o") {{'列表内容 ' + o }}
      el-col(:span="12", :offset="1")
        el-row
          #map
        el-row
          ve-pie(:data="chartData")
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      input: '',
      msg: 'Hello World',
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1/1', '访问用户': 1393 },
          { '日期': '1/2', '访问用户': 3530 },
          { '日期': '1/3', '访问用户': 2923 },
          { '日期': '1/4', '访问用户': 1723 },
          { '日期': '1/5', '访问用户': 3792 },
          { '日期': '1/6', '访问用户': 4593 }
        ]
      }
    }
  },
  mounted() {
    var map = L.map('map', {
      center: [37.002553, 106.890747],
      zoom: 3
    })
    L.esri.tiledMapLayer({
      url: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
    }).addTo(map)

    var popup = L.popup()
    map.on('click', function (e) {
      popup
        .setLatLng(e.latlng)
        .setContent("你点击了 " + e.latlng.toString())
        .openOn(map)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
main-content()
  padding 10px
  background-color #d8d8d8
  border-radius 10px

.container
  padding 16px
  background-color #eee
  border-radius 10px
  h1
    main-content()
  .el-row
    .el-col
      .el-row
        margin-bottom 20px
        main-content()
    .intrdouce
      text-align left
    .element-show
      .el-button
        margin 8px 5px
      .el-input,
      .el-progress,
      .el-card
        margin 8px 0px
#map
  height 300px
</style>
