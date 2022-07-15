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
import { feature } from '@turf/turf';

  const CAMERA_H = 28
  const FOV = 35
  const CAMERA_ANGEL = 67.5 / 180 * Math.PI
  const BBOX_HEIGHT = (CAMERA_H - CAMERA_H / Math.tan(CAMERA_ANGEL)) * 2 - 10
  const MAX_HEIGHT = 4
  const MIN_HEIGHT = 0.5

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
          fov: FOV,
          position: {
            z: 50,
            y: -10,
            x: 0
          },
          lookAt:{
            z: 0,
            y: 0,
            x: 0
          }
      },
      wordList: [],
      fromList: [] 
    }
  },
  watch: {
    attackSourceList(v) {
      this.wordList = v
      this.fromList = []

      this.wordList.map(item => {
        let domText = this.scene.worldPosToScreenPx({x: item.sourceLon, y: item.sourceLag, z: 3})
        domText.adress = item.sourceAddress
        this.fromList.push(domText)

      })
    }
  },
  mounted() {
    this.drawByInteraction()
  },
  created() {
    this.wordList = this.attackSourceList
  },
  beforeDestroy() {

    this.scene.destroy()
  },
  methods: {
    drawByInteraction() {
      const maxHeight = 3;
      let self = this;

      /* eslint-disable */

      let center = turf.center(guizhou).geometry.coordinates
      const scale = 15
      this.scene = new FalconGl.Scene(this.$refs.container, {
        renderer: { // 背景透明配置
          alpha: true,
          autoClearColor: false
        },
        camera: {
          position: {
            z: 25,
            y: -15,
            x: 0
          },
          lookAt:{
            z: 0,
            y: 0,
            x: 0
          }
        }
      })

      let group = new FalconGl.TWO.Group({
        position: center.map(d => -d).concat(1),
        scale: [scale * 1.5, scale * 1.2, 1]
      })

      this.scene.add(group)

      let shapeMap = new FalconGl.TWO.Map.GeojsonShapeMap({
      geojson: guizhou,
      material: {
        color: '#031E3F',
        opacity: 1
      },
      geometry: {
        amount: 1.5,
        steps: 2
      }
    })
    group.add(shapeMap)

    let line = new FalconGl.TWO.Map.GeojsonLineMap({
      geojson: guizhou,
      position: {
        z: 2.5
      },
      material: {
        color: '#34c3e4'
      }
    })
    this.scene.add(line)

    let geomArr = FalconGl.Utils.geoJsonToLineGeometryArray(guizhou)
    let meshline;
    geomArr.forEach((geom) => {
      meshline = new FalconGl.MeshLine({
        material: {
          color: '#34c3e4',
          lineWidth: 0.1
        }
      })
      meshline.position.z = 1.5
      meshline.setGeometry(geom, () => 0.1)

      group.add(meshline)
    })
    let shapeMaps = {}

    guizhou.features.forEach((feature) => {
      let name = feature.properties.name
      shapeMaps[name] = {}
      if (!feature.properties.cp) {
        feature.properties.cp = turf.center(feature).geometry.coordinates
      }
      // console.log(group, 'groups')
      shapeMaps[name]['center'] = feature.properties.cp || feature.properties.cp
      group.add(createTitle(name, new THREE.Vector3(shapeMaps[name]['center'][0], shapeMaps[name]['center'][1], 2.5)))
    })

    function createTitle (name, position) {
      let canvas = createCanvas(name)
      let spriteMap = new THREE.Texture(canvas)
      spriteMap.needsUpdate = true
      let spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        depthTest: false,
        depthWrite: false,
        transparent: true
        // opacity: 0.5
      })
      let sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.x = name.length / 2 * 1.5
      sprite.scale.y = 1 / 2 * 1.5
      sprite.position.copy(position)
      return sprite
    }
    function createCanvas (name) {
      var canvas = document.createElement('canvas')
      canvas.height = 256
      canvas.width = 256 * name.length
      var ctx = canvas.getContext('2d')
      // ctx.fillStyle = '#18384b'
      // ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#ffffff'
      ctx.font = 200 + 'px' + ' 微软雅黑'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.fillText(name, canvas.width / 2, 0)
      // document.body.appendChild(canvas)
      return canvas
    }

    function posScaleCalc (lnglat = [0, 0, 0]) {
      return [
        (lnglat[0] - center[0]) * scale,
        (lnglat[1] - center[1]) * scale,
        lnglat[2]
      ]
    }

    let biu = new FalconGl.TWO.Anime.Biu()
    this.scene.add(biu)

    let duang = new FalconGl.TWO.Anime.Duang()
    this.scene.add(duang)

    function createTitle (name, position) {
      let canvas = createCanvas(name)
      let spriteMap = new THREE.Texture(canvas)
      spriteMap.needsUpdate = true
      let spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        depthTest: false
      })
      let sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.x = (name.length / 2) / 15 * 1.5
      sprite.scale.y = (1 / 2 * 1.5) / 15 * 1.2
      sprite.position.copy(position)
      return sprite
    }

      function createCanvas (name) {
        var canvas = document.createElement('canvas')
        canvas.height = 256
        canvas.width = 256 * name.length
        var ctx = canvas.getContext('2d')
        // ctx.fillStyle = '#18384b'
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#ffffff'
        ctx.font = 200 + 'px' + ' 微软雅黑'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillText(name, canvas.width / 2, 0)
        // document.body.appendChild(canvas)
        return canvas
      }

      // // 生成颜色随机数
      // function num(){
			// 	 var mm = Math.random();
			// 	 var six ="";
			// 	if(mm>0.1)
			// 	{
			// 	six=Math.round(mm*1000000);
			// 	}else{
			// 	 mm += 0.1;
			// 	 six = Math.round(mm*1000000);
			// 	}
			// 	 return six;
      // }

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
          to: posScaleCalc(from)
        })

        duang.create({
          texture: duangTexture,
          during: 2,
          delay: 2,
          times: 1,
          color: color,
          size: 5,
          to: posScaleCalc(to)
        })

        biu.create({
          during: 2,
          delay: 1,
          times: 1,
          color: color,
          thickness: 2,
          crest: 25,
          length: 25,
          to: posScaleCalc(to),
          from: posScaleCalc(from)
        })
        })

      }, 3000)







       /* eslint-disable */
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
  .ten-section-line{
      width: 110px;
    height: 150px;
    position: absolute;
    right: 24%;
    top: 72%;
    background: url('../static/ten_section_line.svg') no-repeat center center;
  }
}
</style>


