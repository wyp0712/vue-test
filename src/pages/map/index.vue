<template>
  <div class="sti-web-map_container">
    <!-- <div class="switch-map-btn">
      <span v-for="(item,index) in mapList" :key="index" :class="item.isClass? 'active' : '' " @click="currentMapEvent(item, index)">{{item.name}} <span v-if="item.status">/</span> </span>
    </div> -->
    <div class="map-container">
      <keep-alive>
        <!-- component中可以添加id但是不能添加class -->
         <component :is="currentView" :attackSourceList = 'attackSourceList'></component>
      </keep-alive>

    </div>
  </div>
</template>
<script>
/* eslint-disable */
/* eslint-disable */
import { mapState, mapActions, mapGetters } from 'vuex'
import worldMap from './components/world'
import chinaMap from './components/china'
import guiyangMap from './components/guiyang'
import testMap from './testcomponent/test'

export default {
  name: 'sti-vis-attackDefendPosture-map',
  props: {},
  data() {
    return {
      startVal: 0,
      currentView: 'chinaMap',
      mapList:[
        {
          name: '世界',
          status: true,
          isClass: false
        },
        {
          name: '中国',
          status: true,
          isClass: true
        },
        {
          name: '贵阳',
          status: false,
          isClass: false
        }
      ],
      attackSourceList: [],
      attackNum: null,
      projectNum: null,
      objAttackList: {},
      objArray: []
    }
  },
  components: {
    worldMap,
    chinaMap,
    guiyangMap
  },
  computed: {
    ...mapState({
      // currentTime: state => state.attackDefendPosture.currentTime
    }),
    ...mapGetters([
      // 'overallStatus'
    ])
  },
  watch: {
    // currentTime(v) {
    //   this.getAttackList(v)

    //   // if (this.objArray.length) {
    //   //   this.getAttackItem(this.objArray, v)
    //   // }
    // },
    // overallStatus(v) {
    //   this.getAttackList()
    //   this.getDataCount()
    // }
  },
  created() {

    if (this.objArray.length) {
      this.getAttackItem(this.objArray, this.currentTime)
    }
    this.getAttackList()
    this.getDataCount()
  },
  mounted() {},
  methods: {
    ...mapActions([
      // 'addMaskPanel',
      // 'updateCurrentTime'
    ]),
    getTimeData() {
      let arr = this.mapList.map(item => {
        return item.name
      })
    },
    getDataCount() {
      this.$ajax.get('integrated/protect/statistics/total', {
          industry_ids: this.overallStatus.industry_ids,
          start_time: this.overallStatus.start_time,
          end_time: this.overallStatus.end_time,
          company_ids: this.overallStatus.company_ids,
          data_source: this.overallStatus.data_source,
          attack_type: this.overallStatus.attack_type,
          data_type: this.overallStatus.data_type
      }).then(res => {
        if (res.data.data) {
          this.attackNum = res.data.data.attack
          this.projectNum = res.data.data.protect
        }
      })
    },
    getAttackItem(objValue, v) {
      let obj = {}
      let data = objValue[v]
      this.attackSourceList = []
      for(let i = 0; i < data.length; i++) {
        obj = {
          sourceAddress: data[i].source_city,
          target_ip: data[i].target_ip,
          targetLon: data[i].target_longitude,
          targetLag: data[i].target_latitude,
          sourceLon: data[i].source_longitude,
          sourceLag: data[i].source_latitude
        }
        this.attackSourceList.push(obj)
      }
    },
    getAttackList(v) {

      this.$ajax.get('integrated/protect/map/source', {
          industry_ids: this.overallStatus.industry_ids,
          start_time: this.overallStatus.start_time,
          end_time: this.overallStatus.end_time,
          company_ids: this.overallStatus.company_ids,
          data_source: this.overallStatus.data_source,
          attack_type: this.overallStatus.attack_type,
          data_type: this.overallStatus.data_type
      }).then(res => {
        let data = res.data
        this.objAttackList = data;
        this.objArray = Object.values(this.objAttackList)

        if (this.objArray.length) {
          this.getAttackItem(this.objArray, v)
        }

        // this.getAttackItem(v)

       // this.attackSourceList = []
        // for(let i = 0; i < data.length; i++) {
        //   obj = {
        //     sourceAddress: data[i].source_country + '/' + data[i].source_province + '/' + data[i].source_city,
        //     target_ip: data[i].target_ip,
        //     targetLon: data[i].target_longitude,
        //     targetLag: data[i].target_latitude,
        //     sourceLon: data[i].source_longitude,
        //     sourceLag: data[i].source_latitude
        //   }
        //   this.attackSourceList.push(obj)
        // }
      })
    },
    currentMapEvent(item, index) {
      this.mapList.forEach((item, ind) => {
        if (index == ind) {
          item.isClass = true
        } else {
          item.isClass = false
        }
      })

      if (index == 0) {
        this.currentView = 'worldMap'
        item.isClass = true
      } else if (index == 1) {
        this.currentView = 'chinaMap'
        item.isClass = true
      } else if (index == 2) {
        this.currentView = 'guiyangMap'
        item.isClass = true
      } else {
        this.currentView = 'testMap'
        item.isClass = true
      }
    }
  }
}
</script>
<style lang="less">
.sti-web-map_container{
  width: 100%;
  height: 100%;
  // border:1px solid red;
  .attack-count{
    width: 700px;
    height:100px;
    line-height: 40px;
    position: absolute;
    left: 15%;
    top:-3%;
    .attack-count-inner{
      // width: 200px;
      // display: inline-block;
      float: left;
      text-align:left;
      font-size: 22px;
      color:#39C6C3;
      span{

        margin-right:0px;
        &:nth-child(1){
          // display: inline-block;
          // width: 200px;
         margin-right:10px;
        }
      }
      .digital{
        display: inline-block;
        width: 170px;
        // border:1px solid red;
        font-family: 'digital';
        font-size: 40px;
      }
    }

  }
  .switch-map-btn{
    width: 150px;
    height: 45px;
    display: flex;
    position: absolute;
    right: 18%;
    top: -5%;
    line-height: 45px;
    z-index:10;
    .active{
      color: #FEFC48;
    }
    span{
      flex:1;
      // border:1px solid red;
      cursor: pointer;
    }
  }
}
</style>


