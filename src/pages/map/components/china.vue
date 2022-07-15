<template>
  <div class="sti-web-map_container">

    <!--  境内外攻击源-->
    <div class="map-inner">
      <div ref="container" id="container" class="container" style="height:520px;"></div>
    </div>
    <div>
          <div class="tip-wrap">
      <div class="tip-item" v-for="(item,index) in fromList" :key="index" v-bind:style="{ left: item.x + 'px', top: item.y + 'px'}">{{item.adress}}</div>
    </div>

    </div>
    <div class="ten-section-line"></div>
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
            x: 90,
            y: 25,
            z: CAMERA_H * 2.2
          },
          lookAt: {
            x: 110,
            y: 37,
            z: 0
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

      this.scene = new FalconGl.Scene(this.$refs.container, {
        renderer: { // 背景透明配置
          alpha: true,
          autoClearColor: false
        },
        camera: this.camera,
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

      createGeojson(china)
      function createGeojson (geojson) {
        shapeEngine.removeAll()
        shapeMap = {}
        // currentCenter = turf.centroid(geojson).geometry.coordinates
        currentCenter = [0, 0]
        let bbox = turf.bbox(geojson)
        let height = bbox[3] - bbox[1]
        currentScale = 1

        geojson.features.forEach((feature) => {
          let name = feature.properties.name
          shapeMap[name] = {}
          // shapeMap[name]['shape'] = shapeEngine.create(feature, {
          //   color: 0x555555,
          //   position: [-currentCenter[0], -currentCenter[1], 0],
          //   scale: [currentScale, currentScale, 1],
          //   name,
          //   material: 'Phong'
          // })
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

        }
      }

      let shapeChina = new FalconGl.TWO.Map.GeojsonShapeMap({
        geojson: china,
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
        geojson: china,
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
          size: 5,
          to: to
        })

        biu.create({
          during: 2,
          delay: 1,
          times: 1,
          color: color,
          thickness: 0.3,
          crest: 3,
          length: 1,
          to: to,
          from: from
        })
        })

      }, 2000)




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


