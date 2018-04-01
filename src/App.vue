<template>
	<div id="app">
		<!-- <img src="./assets/logo.png"> -->
		<!-- <img src="../src/assets/1.jpg" alt=""> -->
		<div id="canvas"></div>
		<router-view/>
	</div>
</template>

<script>
import * as d3 from 'd3'
export default {
	name: 'app',
	created() {
	},
	mounted() {
		console.log(d3)
		d3.select('#canvas').text('Hello,yiifaa!')
	}
}
</script>
<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 30px;
}
</style>
