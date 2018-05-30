/**
 */

// @flow

import 'whatwg-fetch'
import _ from 'lodash'
import { paramsEncode } from 'helper.js'
import { BASE_PATH, COLLECTION_PATH } from 'const/env'
import { RESPONSE_CODE, CLEAR_RULE_STATUS } from 'const/enum'
import $ from 'jquery'
import mockjax from 'jquery-mockjax'
mockjax($, window)

// $.mockjaxSettings.logging = LOG_LEVEL[NODE_ENV];

// Mock 是覆盖Xhr，无法拦截Fetch
const USE_FETCH = false

export default class Service {
  static get basePath () {
    return `${BASE_PATH}/api`
  }

  constructor (name, url, { model = null } = {}) {
    this.name = name
    this.model = model
    this.base = Service.basePath
    this.url = url + Service.basePath + '/' + this.name
    this.poiUrl = url + '/' + this.name
    this.loginUrl = url
  }

  /**
   * @param query {Object}
   * @returns {Promise}
   */
  fetch (query: Object) {
    const params = Service.pageCondition(query)
    return this.send(this.url + '?' + paramsEncode(params))
  }

  get (id: string | number) {
    return this.send(this.url + '/' + id)
  }

  create (prop: Object) {
    return this.send(this.url, {
      method: 'POST',
      body: this.postData(prop)
    })
  }

  update (id, prop) {
    return this.send(this.url + '/' + id, {
      method: 'post',
      body: this.postData(prop)
    })
  }

  remove (id) {
    return this.send(this.url + '/' + id, {
      method: 'delete'
    })
  }

  /**
   * @param data
   */
  postData (data): string {
    return JSON.stringify(data)
  }

  /**
   * @param data
   * @returns {FormData}
   */
  formData (data) {
    const fd = new FormData()
    _.forEach(data, (value, key) => {
      fd.append(key, value)
    })
    return fd
  }

  /**
   * @param url
   * @param params
   * @param deal {Boolean}
   * @returns {Promise}
   */
  send (url, params, deal = true) {
    return Service.send(url, params, deal)
  }

  static send (url, options, deal = true) {
    if (USE_FETCH) {
      return Service.fetchAPI(url, Object.assign({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }, options), deal)
    } else {
      options = options || {
        method: 'get',
        body: null
      }

      // jquery way
      options.type = options.method
      options.data = options.body

      const isFormData = options.data instanceof FormData

      return Service.jqueryAPI(Object.assign({
        url,
        xhrFields: {
          withCredentials: true
        },
        // crossDomain: false,
        // dataType: 'json',
        // contentType: isFormData ? false : 'application/json',
        processData: !isFormData
      }, options), deal)
    }
  }

  static fetchAPI (url, options, deal) {
    const p = fetch(url, Object.assign({
      credentials: 'same-origin'
    }, options)).then((response) => {
      return response.json()
    })
    if (deal) {
      return p.then(Service.result)
    }
    return p
  }

  static jqueryAPI (options, deal) {
    const p = $.ajax(options)
    if (deal) {
      return p.then(Service.result)
    }
    return p
  }

  static result (data) {
    if (typeof data === 'string') {
      data = JSON.parse(data)
    }
    if (data && +data.code === RESPONSE_CODE.NORMAL) {
      return data.result
    }
    if (data && +data.status === 200) {
      return data
    }
    return Promise.reject(data)
  }

  static error (data: ? Object) {
    return {
      code: RESPONSE_CODE.ERROR,
      ...data
    }
  }

  static success (data) {
    return {
      code: RESPONSE_CODE.NORMAL,
      result: data
    }
  }

  static pageCondition (query) {
    return Object.assign(Object.assign({
      pageNo: 1,
      pageSize: 50
    }, query))
  }
}
