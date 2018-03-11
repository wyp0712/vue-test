<template>
  <div class="page-d3">
          {{d3msg}}
          <div id="demo"></div>
  </div>
</template>
<script>
  import * as d3 from 'd3'
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
        d3msg: 'this is d3-test'
      }
    },
    computed: {
      ...mapState({})
    },
    created () {
    },
    mounted () {
      let ages = [12, 32, 33, 16, 40];
      function checkAdult(age) {
        console.log(age)
          return age >= 11;
      }
      function myFunction() {
        document.getElementById("demo").innerHTML = ages.filter(checkAdult);
      }
      myFunction()
    },
    methods: {
      ...mapActions({})
    }
  }
</script>