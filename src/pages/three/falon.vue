<template>
 <div class="sti-vis-assetManagement-map">


  <div class="map-inner"> 
    <div class="map-left" id="map-left">
        <div ref="container" id="container" style="height: 400px"></div>
    </div>
  </div>

 </div>
</template>
<script>
// import {mapState, mapActions, mapGetters} from 'vuex'
// import '../../store'
// import securityEventNum from '../securityEventNum/index.vue';
// import attackType from '../attackType/index'
import './style'
// import centerDistrct from './js/districtCenter.js'

// import * as GEO_MAP from './js/shanghai_json.js'
// let MAPS = GEO_MAP.GEO_MAP

const THREE = window.THREE;

import shanghai from './shanghai.json'

// import duangImg from './static/duang.png'
import FalconGl from '@test/FGL'
const turf = require('@turf/turf')

      /* eslint-disable */
let duangTexture
FalconGl.Utils.createTexture(duangImg).then((texture) => {
  let duangTexture = texture
})
      /* eslint-disable */
export default {
  name: 'sti-vis-network-map',
  props: {},
  data() {
    return {
      scene: null,
      lineResource: [],
      districtCenter: [],
      districtNameMsg: ''
    }
  },
  computed: {
  },
  watch: {},
  components: {
  },
  created() {
  },
  beforeDestroy() {
    this.scene.destroy()
  },
  mounted() {
    this.drawByInteraction()
  },
  methods: {
    regionAdcodeEvent(item, index) {
       this.updateAdcode(item.adcode)
         let regionLine = document.querySelector('.region-line');

         this.itemList.map((val, ind) => {
           if (ind == index) {

            // if (ind < 8) {
            //   regionLine.classList.add('region-line-more');
            // } else if (ind > 8 && ind < 16) {
            //   regionLine.classList.add('region-line-middle');
            // } else {
            //   regionLine.classList.add('region-line-few');
            // }
            regionLine.style.left = (val.left.substring(2, -5) - 45) + '%'
            regionLine.style.top = (val.top.slice(0, -2) - 155) + 'px'
           }

         })

    },
    drawByInteraction() {
      let self = this;

      /* eslint-disable */
      const center = turf.centroid(shanghai).geometry.coordinates
      const scale = 15
      const highlightColor = '#24d2fd'
      const uhColor = '#000000'
      const maxHeight = 2
      this.scene = new FalconGl.Scene(this.$refs.container, {
        renderer: {
          alpha: true,
          autoClearColor: false
        },
        camera: {
          position: {
            z: 14,
            y: -14,
            x: 0
          },
          lookAt:{
            z: 0,
            y: 0,
            x: 0
          }
        },
        events: {
          openClick: true,
          openMouseMove: true
        }
      })
      // 天空盒添加背景
      // let skyBox = new FalconGl.SkyBox({
      //   maps: [
      //     self.resources.left,
      //     self.resources.right,
      //     self.resources.top,
      //     self.resources.bottom,
      //     self.resources.front,
      //     self.resources.back
      //   ]
      // })
      // scene.add(skyBox)

      // var spotlight = new THREE.SpotLight(0x25adfc, 1.2) // 0x2aadff 0x2aadde
      
      var spotlight = new THREE.SpotLight(0xffffff, 1.2) // 0x2aadff 0x2aadde
      spotlight.angle = Math.PI / 3
      spotlight.penumbra = 1
      spotlight.decay = 1
      spotlight.distance = 3000
      spotlight.castShadow = false
      spotlight.position.set(0, 0, 40)
      spotlight.shadow.mapSize.width = 2048
      spotlight.shadow.mapSize.height = 2048

      var target = new THREE.Object3D()
      // target.position.set(center[0], center[1], 0)
      spotlight.target = target
      spotlight.target.updateMatrixWorld()

      this.light = spotlight
      this.scene.add(spotlight)
      // scene.add(new THREE.SpotLightHelper(spotlight))

      let shapeEngine = new FalconGl.TWO.Anime.ShapeEngine()
      this.scene.add(shapeEngine)

      var shapeMap = {}
      var currentShape = null

      createGeojson(shanghai)

      // createGeojson(chongming)
      shapeEngine.on('click', ({originalEvent, target}) => {

        if (target) {
          // console.log(target.feature.properties.name, 'target')

          let name = target.feature.properties.name
          this.districtNameMsg = name
          self.districtCenter = centerDistrct.districtCenter(name)
          self.setRegionalId(name)
        }
      })
      shapeEngine.on('mousemove', ({originalEvent, target}) => {
        if (target !== currentShape) {
          if (target) {
            target.children[0].material.emissive = new THREE.Color(highlightColor)
          }
          if (currentShape) {
            currentShape.children[0].material.emissive = new THREE.Color(uhColor)
          }
          currentShape = target
        }
      })

      function createGeojson (geojson) {
        shapeEngine.removeAll()
        shapeMap = {}
        let colorArr = ['#00479d','#005cda', '#006ed4', '#0087d4', '#00b4ff', '#006cff', '#0150e1', '#003cff', '#0101e4', '#00a0e9', '#0068b7', '#0075a9', '#004986', '#00479d', '#006ed4', '#006ed4']
        let str = 0
        geojson.features.forEach((feature) => {
          let name = feature.properties.name
          shapeMap[name] = {}
          str ++

          if (str > 13) str = 0;
          shapeMap[name]['shape'] = shapeEngine.create(feature, {
              color: colorArr[str],
              position: [-center[0], -center[1], 0],
              scale: [scale, scale, 1],
              name,
              material: 'Lambert'
          })

        })
        setTimeout(() => {
          setData()
        }, 50)
      }

      function setData () {
        for (let name in shapeMap) {
          let shape = shapeMap[name].shape
          let random = Math.random() * 2
          let height = Math.random() * 1
          let color = '#0068b7'

              shape.animateTo({
                height
             })


        }
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
      clearInterval(interval)

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

      let interval = setInterval(() => {
        let from = [Math.random() + 121.05, Math.random() + 31.02, maxHeight]
         //  [Math.random() * 40 + 90, Math.random() * 20 + 20, maxHeight]
        let to = self.districtCenter
        // [121.47, 31.23, maxHeight]
        // [116.43791108190892, 40.132164946001325, maxHeight]

        let color = '#dd6223'
        duang.create({
          texture: duangTexture,
          during: 2,
          times: 1,
          color: color,
          size: 0,
          to: posScaleCalc(from)
        })

        duang.create({
          texture: duangTexture,
          during: 2,
          delay: 2,
          times: 1,
          color: color,
          size: 3,
          to: posScaleCalc(to)
        })

        biu.create({
          during: 2,
          delay: 1,
          times: 1,
          color: color,
          thickness: 0.2,
          crest: 3,
          length: 1,
          to: posScaleCalc(to),
          from: posScaleCalc(from)
        })
      }, 200)
       /* eslint-disable */
    }
  }
}
</script>
