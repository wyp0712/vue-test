<template>
  <div>

    <h1>{{$store.state.count}}</h1>
    <h3>{{msg}}</h3>

     <button @click="actionName()">+</button>
    <button @click="actionReduce">-</button>

  </div>
</template>

<script>
import { Button, Select } from 'element-ui'
import store from '../store/index'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  data () {
    return {  
      show: true,
      msg: 'this is master'
    }
  },
  computed: {
    ...mapState({
      count: state => state.count
    }),
    ...mapGetters([
      'strLength'
    ]),
  },
  created () {
    console.log(this.strLength)
  },
  methods: {
    ...mapActions([
      'actionName',
      'actionReduce'
    ])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button{
    width:50px;
    height:50px;
    background:red;
    font-size: 25px;
    text-align: center;
    border:1px solid #ccc;
    margin-left:20px;
  }
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
