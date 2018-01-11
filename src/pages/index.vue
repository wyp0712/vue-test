<template>
  <div class="sti-web__integrated-alarmDetail">
    <attactHistory></attactHistory>

    <div class="alarms-detail-info">
      <p><span @click="forwardApp()" style='display: none;'>{{ forwardType }}</span></p>
    </div>
    <div class="alarmDetail-con">
      <ul class="alarmDetail-list">
        <li v-for="(value, key) in tableData" :key="key">
          <span class="title" :title="key">{{ key }}</span>
          <span class="value">{{ value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import attactHistory from '../attactHistory/index'
import snap from '../companySnapNewShot/index'
import './style'
import moment from 'moment'
export default {
  name: 'sti-vis-integrated-alarm-detail',
  props: {
    parentParam: {
      default: ''
    },
    parentCol: {
      default: 1
    },
    parentRow: {
      default: 1
    },
    parentWidth: {
      default: 1
    },
    parentHeight: {
      default: 1
    }
  },
  data() {
    return {
      tableData: {},
      baseFields: {},
      forwardType: ''
    }
  },
  components: {
    attactHistory,
    snap
  },
  methods: {
    forwardApp() {
      window.open('/static/img/pageIntelligenceSystem.jpeg');
    }
  },
  mounted() {
    const {baseFields: BASE_FIELDS_CATEGORY} = window.$sti_dict;
    this.baseFields = BASE_FIELDS_CATEGORY.selectable;
    let dictKeys = Object.keys(this.baseFields)
    let tmpData = this.parentParam;
    for (let strkey in tmpData) {
      if (dictKeys.indexOf(strkey) >= 0) {
        if (strkey == 'organization_id') {
          continue;
        }
        if (strkey == 'event_type' || strkey == 'event_subtype') {
          const {alert: ALERT_CATEGORY} = window.$sti_dict;
          this.tableData[this.baseFields[strkey].name] = ALERT_CATEGORY.explanation[tmpData[strkey]]
        } else if (strkey == 'industry_id') {
          const {industry: INDUSTRY_CATEGORY} = window.$sti_dict;
          this.tableData[this.baseFields[strkey].name] = INDUSTRY_CATEGORY[tmpData[strkey]]
        } else if (strkey == 'notify_status') {
          const {notifyStatus: NOTIFY_STATUS_CATEGORY} = window.$sti_dict;
          this.tableData[this.baseFields[strkey].name] = NOTIFY_STATUS_CATEGORY[tmpData[strkey]]
        } else if (strkey == 'event_level') {
          const {eventLevel: EVENT_LEVEL_CATEGORY} = window.$sti_dict;
          this.tableData[this.baseFields[strkey].name] = EVENT_LEVEL_CATEGORY[tmpData[strkey]]
        } else if (strkey == 'event_status') {
          const {eventStatus: EVENT_STATUS_CATEGORY} = window.$sti_dict;
          this.tableData[this.baseFields[strkey].name] = EVENT_STATUS_CATEGORY[tmpData[strkey]]
        } else if (strkey == 'found_time') {
          this.tableData[this.baseFields[strkey].name] = moment(tmpData[strkey]).format('YYYY-MM-DD HH:mm:ss')
        } else if (strkey == 'adcode') {
          const {region: REGION_CATEGORY} = window.$sti_dict;
          if (REGION_CATEGORY.region[tmpData[strkey]]) {
            this.tableData[this.baseFields[strkey].name] = REGION_CATEGORY.region[tmpData[strkey]].name
          } else {
            this.tableData[this.baseFields[strkey].name] = tmpData[strkey]
          }
        } else if (strkey == 'event_label' || strkey == 'threat_resource') {
           this.tableData[this.baseFields[strkey].name] = tmpData[strkey].toString();
        } else {
          this.tableData[this.baseFields[strkey].name] = tmpData[strkey] ? tmpData[strkey] : ' '
        }
      } else if (strkey == 'organization_name') {
        this.tableData[this.$t('visIntegrated.global.company_name')] = tmpData[strkey]
      }
    }
    this.forwardType = this.$t('visIntegrated.global.intelligence_information')
  }
}
</script>
