<template>
  <div>
    {{test}}
      <div v-for ="(item, index) in items" @click = "selected(item, index)">
        <input type="checkbox" v-model = "item.state">
          {{item.key}}
      </div>
  </div>
</template>
<script>
  export default {
    name: 'checkbox',
    data() {
      return {
        test: 'this is test',
        items: [
          {
            id: 0,
            key: 'core',
            state: false
          },
          {
            id: 1,
            key: 'import',
            state: false
          },
          {
            id: 2,
            key: 'core3',
            state: false
          }
        ]
      }
    },
    created() {

    },
    methods: {
      selected(item, index) {

        this.items.map((val, ind) => {
          if(index == val.id) {
            val.state = !val.state
            console.log(val.state)
          }
        })
      }
    }
  }
</script>