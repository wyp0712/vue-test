<template>
  <div>
   <!-- <p><input type="checkbox" v-model="checkall" value="全选" @click="showcheckall" >全选</p>
      <div class="checkitems" v-for="(x,i) in data" :key="i">
        <h1 style="background:#3A3737;color:#fff;"><input type="checkbox" v-model="checkallitem" :value="x.name" @click="showcheckallitem">{{x.name}}</h1>
        <div v-for="(xx,ii) in x.sub" :key="ii">
          <p style="border-bottom: 1px solid #F0F0F0;background:#F8F8F8;"><input type="checkbox" v-model="allitem" :value="xx.name">{{xx.name}}</p>
          <p v-for="(xxx,iii) in xx.sub" :key="iii" style="display: flex;align-items: center;border-bottom: 1px solid #f0f0f0;color:#9B9B9B;">
            <span style="border-right:1px solid #ccc;width: 131px;height:20px ;line-height: 20px;">
              <input type="checkbox" v-model="allitems" :value="xxx.name">{{xxx.name}}
            </span>
            <span v-for="(xxxx,iiii) in xxx.sub" :key="iii-iiii" style="height:20px;line-height: 20px;">
              <input type="checkbox" v-model="items" :value="xxxx+xxx.name" style="margin-left: 15px" @click="showitems">{{xxxx}}
            </span>
          </p>
        </div>
      </div> -->
      <div class="item" v-for="item in data">
          <h2 @click="fist()"><input type="checkbox" v-model="item.state">{{item.name}}</h2>
          <div v-for="key in item.sub">
              <h4>{{key.name}}</h4>
              <div v-for = "list in key.sub">
                <span>
                  <input type="checkbox"> {{list}} 
                </span>
              </div>
          </div>
          <!-- <div>
              <h4>营业部管理</h4>
              <div>
                  <span><input type="checkbox">公司列表</span>
                  <span><input type="checkbox">
                    添加公司</span>
                </div>
          </div>
          <div>
              <h4>员工管理</h4>
              <div>
                  <span>公司列表</span><span>添加公司</span>
                </div>
          </div> -->
      </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        value: false,
        msg: 'this is vue',
        data:[
              {
                "name":'人事管理',
                "sub":[{
                  "name":"公司管理",
                  "sub":[
                    {
                      "name":"公司列表",
                      "sub":[
                        "添加公司",
                        "修改",
                        "删除"
                      ]
                    }
                  ]
                },{
                  "name":"营业部管理",
                  "sub":[
                    {
                      "name":"营业部列表",
                      "sub":[
                        "添加营业部",
                        "修改",
                        "删除"
                      ]
                    },
                    {
                      "name":"营业部类型",
                      "sub":[
                        "添加团队",
                        "编辑团队",
                        "删除团队",
                        "添加员工",
                        "移除员工"
                      ]
                    }
                  ]
                },{
                  "name":"员工管理",
                  "sub":[
                    {
                      "name":"员工列表",
                      "sub":[
                        "添加公司",
                        "修改",
                        "删除"
                      ]
                    }
                  ]
                }]
              }
            ],
      }
    },
    created() {

    },
    methods: {
      fist() {

      }
    }
  }
</script>