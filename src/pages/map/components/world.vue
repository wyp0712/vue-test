<template>
  <div class="sti-web-map_container">

    <!--  境内外攻击源-->
    <div class="map-inner">
      <div ref="container" id="container" class="container" style="height:520px;"></div>
    </div>
    <div class="tip-wrap">
      <div class="tip-item" v-for="(item,index) in fromList" :key="index" v-bind:style="{ left: item.x + 'px', top: item.y + 'px'}">{{item.adress}}</div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import duangImg from '../static/duang.png'
const turf = require('@turf/turf')
import FalconGl from '@vislab/FGL'

import china from '../json/china.json'
import guizhou from '../json/guizhou.json'
import world from '../json/world.json'

let duangTexture
FalconGl.Utils.createTexture(duangImg).then((texture) => {
  let duangTexture = texture
})
/* eslint-disable */

export default {
  name: 'sti-vis-attackDefendPosture-map',
  props: ['attackSourceList'],
  data() {
    return {
      camera: {
          position: {
            z: 185, // 变大
            y: 70, // 距离远近调节
            x: 70
          },
          lookAt:{
            z: 10, // 剧中程度
            y: 35,
            x: 40 // 左右移动
          },
          control: { 
            noPan: true // 拖拽 位移
          }
      },
      wordList: [],
      fromList: [] 
    }
  },
  watch: {
    attackSourceList(v) {
      this.wordList = v
      console.log(this.wordList, 'wordList')
      this.fromList = []

      this.wordList.map(item => {
        let domText = this.scene.worldPosToScreenPx({x: item.sourceLon, y: item.sourceLag, z: 3})
        domText.adress = item.sourceAddress
        this.fromList.push(domText)

      })
     console.log(this.fromList, 'fromList')
    }
  },
  created() {
    this.wordList = this.attackSourceList
  },
  mounted() {
    this.drawByInteraction()
  },
  beforeDestroy() {

    this.scene.destroy()
  },
  methods: {
    drawByInteraction() {
      let self = this;

      /* eslint-disable */
      // const center = turf.centroid(guizhou).geometry.coordinates
      // const scale = 15
      // const highlightColor = '#24d2fd'
      // const uhColor = '#000000'
      let label;
      const maxHeight = 3
      this.scene = new FalconGl.Scene(this.$refs.container, {
        renderer: { // 背景透明配置
          alpha: true,
          autoClearColor: false
        },
        camera: this.camera,
        events: {
          // openClick: true,
          // openMouseMove: true
        }
      })

      // label
      if (label) {
        label.setProperties({
          width: 40,
          height: 40,
          canvasWidth: 250,
          canvasHeight: 250,
          content: [{
            fontSize: '40px',
            text: 'hello',
            color: 'yellow'
          }],
          fillColor: 'red'
        })
      } else {
        label = new FalconGl.Label({
            width: 40,
            height: 40,
            canvasWidth: 256 * 4,
            canvasHeight: 256 * 4,
            content: [{
              fontSize: '200px',
              text: '赞',
              color: '#dff1fd',
              textAlign: 'left'
            }],
            fillColor: '#ffff00'
          })
          // this.scene.add(label)
      }

      var directionalLight = new THREE.DirectionalLight(0x2aadff, 1.3)
      directionalLight.position.set(0, -120, 150)

      this.scene.add(directionalLight)

      let testShap =new FalconGl.TWO.Map.GeojsonShapeMap({
        geojson: world,
        material: {
          material: 'Lambert',
          color: '#0f3b4f',
          opacity: 1
        },
        geometry: {
          amount: 2.5,
          steps: 2
        }
      })

      this.scene.add(testShap)

      let geometryArr = FalconGl.Utils.geoJsonToLineGeometryArray(world)
      geometryArr.forEach((geom) => {
        let meshline = new FalconGl.MeshLine({
          material: {
            transparent: false, // 是否显示地图边线
            color: '#34c3e4',
            opacity: 0,
            resolution: [this.$refs.container.clientWidth, this.$refs.container.clientHeight]
          }
        })
        meshline.setGeometry(geom, () => 0.5)
        meshline.position.z = 3.7
        this.scene.add(meshline)
      })
      let biu = new FalconGl.TWO.Anime.Biu()
      this.scene.add(biu)

      let duang = new FalconGl.TWO.Anime.Duang()
      this.scene.add(duang)

      let from = [], to = []

      clearInterval(interval)
      let interval = setInterval(() => {

        // item.sourceLonLag.map(d => +d);
        this.wordList.map(item => {
          from = [item.sourceLon, item.sourceLag, maxHeight]
          to = [item.targetLon, item.targetLag, maxHeight]
        let color = '#dd6223'


        duang.create({
          texture: duangTexture,
          during: 2,
          times: 1,
          color: color,
          size: 5,
          to: from
        })

        duang.create({
          texture: duangTexture,
          during: 2,
          delay: 2,
          times: 1,
          color: color,
          size: 1,
          to: to
        })

        biu.create({
          during: 2,
          delay: 1,
          times: 1,
          color: color,
          thickness: 0.5,
          crest: 1,
          length: 1,
          to: to,
          from: from
        })
        })


      }, 2000)


       /* eslint-disable */
    },
    getAttackSourceAddress() {

    }
  }

}
</script>
<style lang="less">
.sti-web-map_container{
  width: 100%;
  height: 100%;
  // border:1px solid red;
  .map-inner{
    width: 100%;
    height:100%;
     .container{
        width: 100%;
        height:100%;
     }
  }
  .tip-wrap{
    .tip-item{
      position: absolute;
      font-size: 12px;
      color: aqua;
    }
  }
}
</style>


