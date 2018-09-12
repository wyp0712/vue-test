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
import guiyang from '../json/guizhou.json'
import world from '../json/world.json'

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
      },
      wordList: [],
      fromList: []
    }
  },
  mounted() {
    this.drawByInteraction()
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
  beforeDestroy() {

    this.scene.destroy()
  },
  created() {
    this.wordList = this.attackSourceList
  },
  methods: {
    drawByInteraction() {
      /* eslint-disable */
      let self = this;
      const center = turf.centroid(guiyang).geometry.coordinates
      const scale = 30
      const maxHeight = 3
      this.scene = new FalconGl.Scene(this.$refs.container, {
        renderer: {
          alpha: true,
          autoClearColor: false
        },
        camera: {
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
        events: {
          openClick: false,
          openMouseMove: false
        }
      })

      var directionalLight = new THREE.DirectionalLight(0x2aadff, 1.3)
      directionalLight.position.set(0, -120, 150)
      this.scene.add(directionalLight)
      let shapeEngine = new FalconGl.TWO.Anime.ShapeEngine()
      this.scene.add(shapeEngine)

      var shapeMap = {}
      var currentName = ''
      var currentCenter = null
      var currentScale = null
      var currentShape = null

      // createGeojson(guiyang)
      function createGeojson (geojson) {
        shapeEngine.removeAll()
        shapeMap = {}

        geojson.features.forEach((feature) => {
          let name = feature.properties.name
          shapeMap[name] = {}
          shapeMap[name]['shape'] = shapeEngine.create(feature, {
            color: '#555555',
            position: [-center[0], -center[1], 0],
            scale: [scale * 1.5, scale * 1, 1],
            name,
            material: 'Lambert'
          })

          if (!feature.properties.cp) {
            feature.properties.cp = turf.center(feature).geometry.coordinates
          }
          shapeMap[name]['center'] = feature.properties.cp || feature.properties.cp
          self.scene.add(createTitle(name, new THREE.Vector3(shapeMap[name]['center'][0], shapeMap[name]['center'][1], 2.5)))
        })

        setTimeout(() => {
          setData()
        }, 50)
      }
      function setData () {
        for (let name in shapeMap) {
          let shape = shapeMap[name].shape
          let random = Math.random()
          let height = 0.5 + (4 - 0.5) * random
          let color = new THREE.Color(random, random, random)
          let x = (shapeMap[name]['center'][0] - currentCenter[0])
          let y = (shapeMap[name]['center'][1] - currentCenter[1])
          // shape.animateTo({
          //   // height, color
          // })
        }
      }

      let shapeChina = new FalconGl.TWO.Map.GeojsonShapeMap({
        geojson: guiyang,
        material: {
          material: 'Lambert',
          color: 0x082b3f,
          opacity: 1
        },
        geometry: {
          amount: 2.5,
          steps: 2
        }
      })
      this.scene.add(shapeChina)

      let line = new FalconGl.TWO.Map.GeojsonLineMap({
        geojson: guiyang,
        position: {
          z: 2.5
        },
        material: {
          color: '#34c3e4'
        }
      })
      this.scene.add(line)

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
        sprite.scale.x = name.length / currentScale * 1.5
        sprite.scale.y = 1 / currentScale * 1.5
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
        sprite.scale.x = name.length / currentScale
        sprite.scale.y = 1 / currentScale * 1.5
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


      // 生成颜色随机数
      function num(){
				 var mm=Math.random();
				 var six ="";
				if(mm>0.1)
				{
				six=Math.round(mm*1000000);
				}else{
				 mm += 0.1;
				 six = Math.round(mm*1000000);
				}
				 return six;
      }

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
          length: 15,
          to: posScaleCalc(to),
          from: posScaleCalc(from)
        })
        })

      }, 2500)
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
}
</style>


