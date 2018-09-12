<template>
  <div>
    tablePage
  </div>
</template>
<script>
import  api  from '../../api/index.js'
export default {
  name: '',
  data() {
    return {

    }
  },
  created() {

    this.getPageData()
  },
  methods: {
    getPageData() {
      //   let params = {
			// 		page: 1,
			// 		name: 'devin'
			// 	};
      // this.$http.get('/user/listpage', {params}).then(res => {
      //   console.log(res)
      // })
      let params = {
					page: 1,
					name: 'devin'
				};
				api.getUserListPage({params}).then((res) => {
          console.log(res, 'getUserListPage')
					// this.total = res.data.total;
					// this.users = res.data.users;
				});
    }
  }
}
</script>