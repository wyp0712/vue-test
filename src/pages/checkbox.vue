<template>
  <div>
    {{test}}
      <div v-for ="(item, index) in items" @click = "selected(item, index)">
        <input type="checkbox" v-model = "item.state">
          {{item.key}}
      </div>
<div style="height: 200px;width: 200px;border:1px solid #ccc;">
  {{test}}
</div>
      <div>
        <ul>
          <li style="opacity: 0.2;">2001年1月30日 15时20分</li>
          <li style="opacity: 0.4;">2001年1月30日 15时20分</li>
          <li style="opacity: 0.6;">2001年1月30日 15时20分</li>
          <li style="opacity: 0.8;">2001年1月30日 15时20分</li>
          <li style="opacity: 1;">2001年1月30日 15时20分</li>
          <li style="opacity: 0.8;">2001年1月30日 15时20分</li>
          <li style="opacity: 0.6;">2001年1月30日 15时20分</li>
          <li style="opacity: 0.4;">2001年1月30日 15时20分</li>
          <li style="opacity: 0.2">2001年1月30日 15时20分</li>
        </ul>
      </div>

  </div>
</template>
<script>
  export default {
    name: 'checkbox',
    data() {
      return {
        test: '',
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
      // setInterval(item => {
        this.getdata()
      // },500)

    },
    methods: {
      getdata() {
          this.$http.get("./static/data.json").then(rs => {
          console.log(rs)
          this.test = rs.data[0].name
      })
      },
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