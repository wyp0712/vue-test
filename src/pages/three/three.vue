<template>
  <div>

  </div>
</template>
<script>
  import './three.js'
  const THREE = window.THREE
    import world from './110100.json'
    // import duangImg from '../resources/textures/animation/duang.png'
  
    var duangTexture
    FalconGl.Utils.createTexture(duangImg)
      .then((texture) => {
        duangTexture = texture
      })
    
    export default {
      mounted () {
  
        var scene = new FalconGl.Scene(this.$refs.container, {
          camera: {
            position: {
              z: 200,
              y: -80
            }
          }
        })
  
        scene.add(new FalconGl.TWO.Map.GeojsonShapeMap({
          geojson: world,
          material: {
            type: 'MeshLambertMaterial',
            color: 0x082b3f,
            opacity: 1
          },
          geometry: {
            amount: 3.5,
            steps: 2
          }
        }))
  
        var directionalLight = new THREE.DirectionalLight(0xfffff, 1.3)
        directionalLight.position.set(0, -120, 150)
        scene.add(directionalLight)
  
        scene.add(new FalconGl.TWO.Map.GeojsonLineMap({
          material: {
            color: 0x34a3c4
          },
          position: {
            z: 0
          }
        }))
  
        let geometryArr = FalconGl.Utils.geoJsonToLineGeometryArray(world)
        geometryArr.forEach((geom) => {
          let meshline = new FalconGl.MeshLine({
            material: {
              transparent: true,
              color: '#34c3e4',
              opacity: 0.5,
              resolution: [this.$refs.container.clientWidth, this.$refs.container.clientHeight]
            }
          })
          meshline.setGeometry(geom, () => 1.1)
          meshline.position.z = 3.5
          scene.add(meshline)
        })
  
        let biu = new FalconGl.TWO.Anime.Biu()
        scene.add(biu)
  
        let duang = new FalconGl.TWO.Anime.Duang()
        scene.add(duang)
  
        let interval = setInterval(() => {
          let from = [Math.random() * 360 - 180, Math.random() * 180 - 90, 3.5]
          let to = [120, 40, 3.5]
  
          let color = '#dd6223'
          duang.create({
            texture: duangTexture,
            during: 2,
            times: 1,
            color: color,
            size: 10,
            to: from
          })
  
          duang.create({
            texture: duangTexture,
            during: 2,
            delay: 2,
            times: 1,
            color: color,
            size: 10,
            to: to
          })
  
          biu.create({
            during: 2,
            delay: 1,
            times: 1,
            color: color,
            thickness: 1,
            crest: 40,
            length: 1,
            to: to,
            from: from
          })
        }, 100)
      }
    }
  
  </script>