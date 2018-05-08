<template>
	<div class="page1">
			<div class="scroll-wrap">
					<ul class="scroll-content" :style="{ top }">
							<li v-for="item in prizeList">
								 <p>{{item.name}}</p>
								 <ul v-for="key in item.tag" style="display:inline-block">
									 <li >{{key}}</li>
								 </ul>
							</li >
					</ul>
			</div>
	</div>
</template>
<script>
// import api from './config.js'
export default {
	name: 'array',
	data () {
		return {
			prizeList: [
				{
					name: 0,
					tag: ['gongji','shibai','jiayou']
				 },
				{
					name: 1 ,
					tag: ['gongji','shibai','jiayou']
				},
				{
					name: 2 ,
					tag: ['gongji','shibai','jiayou']
				},
				{
					name: 3 ,
					tag: ['gongji','shibai','jiayou']
				},
				{
					name: 4 ,
					tag: ['gongji','shibai','jiayou']
				}
			],
			activeIndex: 0,
			alert: []
		}
	},
	computed: {
		top() {
			return - this.activeIndex * 50 + 'px';
		}
	},
	created() {
		// this.$http.get('../static/dict.json').then((rs) => {
		//   window.$dict = rs.data.data
		// })
	},
	mounted() {
		// const {baseFields: BASE_FIELDS_CATEGORY} = window.$sti_dict;
		console.log(window.$dict)
		// this.baseFields = BASE_FIELDS_CATEGORY.selectable;
		// let dictKeys = Object.keys(this.baseFields)
		// let tmpData = this.parentParam;
		// for (let strkey in tmpData) {
		//   if (dictKeys.indexOf(strkey) >= 0) {
		//     if (strkey == 'organization_id') {
		//       continue;
		//     }
		//     if (strkey == 'event_type' || strkey == 'event_subtype') {
		//       const {alert: ALERT_CATEGORY} = window.$sti_dict;
		//       this.tableData[this.baseFields[strkey].name] = ALERT_CATEGORY.explanation[tmpData[strkey]]
		//     } else if (strkey == 'industry_id') {
		//       const {industry: INDUSTRY_CATEGORY} = window.$sti_dict;
		//       this.tableData[this.baseFields[strkey].name] = INDUSTRY_CATEGORY[tmpData[strkey]]
		//     } else if (strkey == 'notify_status') {
		//       const {notifyStatus: NOTIFY_STATUS_CATEGORY} = window.$sti_dict;
		//       this.tableData[this.baseFields[strkey].name] = NOTIFY_STATUS_CATEGORY[tmpData[strkey]]
		//     } else if (strkey == 'event_level') {
		//       const {eventLevel: EVENT_LEVEL_CATEGORY} = window.$sti_dict;
		//       this.tableData[this.baseFields[strkey].name] = EVENT_LEVEL_CATEGORY[tmpData[strkey]]
		//     } else if (strkey == 'event_status') {
		//       const {eventStatus: EVENT_STATUS_CATEGORY} = window.$sti_dict;
		//       this.tableData[this.baseFields[strkey].name] = EVENT_STATUS_CATEGORY[tmpData[strkey]]
		//     } else if (strkey == 'found_time') {
		//       this.tableData[this.baseFields[strkey].name] = moment(tmpData[strkey]).format('YYYY-MM-DD HH:mm:ss')
		//     } else if (strkey == 'adcode') {
		//       const {region: REGION_CATEGORY} = window.$sti_dict;
		//       if (REGION_CATEGORY.region[tmpData[strkey]]) {
		//         this.tableData[this.baseFields[strkey].name] = REGION_CATEGORY.region[tmpData[strkey]].name
		//       } else {
		//         this.tableData[this.baseFields[strkey].name] = tmpData[strkey]
		//       }
		//     } else if (strkey == 'event_label' || strkey == 'threat_resource') {
		//        this.tableData[this.baseFields[strkey].name] = tmpData[strkey].toString();
		//     } else {
		//       this.tableData[this.baseFields[strkey].name] = tmpData[strkey] ? tmpData[strkey] : ' '
		//     }
		//   } else if (strkey == 'organization_name') {
		//     this.tableData[this.$t('visIntegrated.global.company_name')] = tmpData[strkey]
		//   }
		// }

		setInterval(_ => {
			if(this.activeIndex < this.prizeList.length) {
				this.activeIndex += 1;
			} else {
				this.activeIndex = 0;
			}
		}, 2000);

	}
}
</script>
<style lang="scss" scoped>
	.scroll-wrap{
		border: 1px solid blue;
		overflow: hidden;
	}
	.scroll-content{
		position: relative;
		transition: top 0.5s;
	}
	.scroll-content li{
		line-height:50px;
		text-align:center;
	}
</style>