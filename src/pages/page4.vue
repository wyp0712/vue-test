<template>
	<div>
		<div class="marquee">
			<div class="marquee_title">
				<span>最新战报</span>
			</div>
			<div class="marquee_box">
				<ul class="marquee_list" :style="{ top: -num + 'px'}" :class="{marquee_top:num}">
				<!-- 当显示最后一条的时候（num=0转换布尔类型为false）去掉过渡效果-->
					<li v-for="(item, index) in marqueeList" >
						<span>{{item.name}}</span>
						<span>在</span>
						<span class="red"> {{item.city}}</span>
						<span>杀敌</span>
						<span class="red"> {{item.amount}}</span>
						<span>万</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
	</template>

<script>
export default {
		name: 'page4',
		data () {
		return {
				num: 0,
				marqueeList: [
					{
						name: '1军',
						city: '北京',
						amount: '10'
					},
					{
						name: '2军',
						city: '上海',
						amount: '20'
					},
					{
						name: '3军',
						city: '广州',
						amount: '30'
					},
					{
						name: '4军',
						city: '重庆',
						amount: '40'
					}]
				}
		},
		created () {
				this.showMarquee(this.num)
		},
		methods: {
				showMarquee:function (num) {
						this.marqueeList.push(this.marqueeList[0])
						var max = this.marqueeList.length
						var that = this;
						marqueetimer =  setInterval(function(){
								num++
								if(num>=max ){
									num=0
								}
								that.num=num*30
						}, 2000)
				}
		}
}
	</script>

	<style scoped>
	 div,ul,li,span,img{
			margin:0;
			padding:0;
			display: flex;
			box-sizing: border-box;
		}
		.marquee{
			width: 100%;
			height: 50px;
			align-items: center;
			color: #3A3A3A;
			background-color: aqua;
			display: flex;
			box-sizing: border-box;
		}
		.marquee_title{
			padding: 0 20px;
			height: 30px;/*关键样式*/
			font-size: 14px;
			border-right: 1px solid #d8d8d8;
			align-items: center;
		}

		.marquee_box{
			display: block;
			position: relative;
			width: 60%;
			height: 30px;/*关键样式*/
			overflow: hidden;
		}
		.marquee_list{
			display: block;
			position: absolute;
			top:0;
			left: 0;
		}
		.marquee_top{transition: top 0.5s ;}/*关键样式*/
		.marquee_list li{
			height: 30px;/*关键样式*/
			line-height: 30px;/*关键样式*/
			font-size: 14px;
			padding-left: 20px;
			background-color: #fff;
		}
		.marquee_list li span{
			padding:0 2px;
		}
		.red{
			color: #FF0101;
		}
	</style>
