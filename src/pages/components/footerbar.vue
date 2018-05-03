<template>
    <div class="head-bar">
       <p v-for="item in msg">{{item.desc}}</p>
    </div>
  </template>
  <script>
    export default {
      name: 'headerbar',
      data() {
        return {
          msg: []
        }
      },
      created() {
        this.$http.get('../../static/dict.json').then(rs => {
          console.log(rs.data.data.notifyTime)
          this.msg = rs.data.data.notifyTime
  
          console.log(this.msg)
        })
      }
    }
  </script>