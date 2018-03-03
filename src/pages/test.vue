<template>
    <div class="container">
      {{msg}}

      <ul v-for="item in list">
          <li>{{item.name}}</li>
          <li>{{item.age}}</li>
      </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              msg: 'hello vue test',
              list: [
                  {
                      name: 'ccte',
                      age: 18
                  },
                  {
                      name: 'ccte',
                      age: 18
                  },
                  {
                      name: 'ccte',
                      age: 18
                  }
              ]
            }
        },
        created() {
          // 实例 初始化时候的生命zhouqi
          console.log(this, 'vueVm')
        },
        mounted() {
          // dom作的地方
          this.$nextTick(item => {
              // dom 
          })
        }
    }
</script>

<style scoped lang="">

</style>