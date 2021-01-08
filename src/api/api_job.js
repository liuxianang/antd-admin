/**
 * Created by bootdo.
 * 任务相关api
 */
import * as API from './'

export default {

  //查询获取role列表(通过page分页)
  list: params => {
    return API.GET('/api-admin/job', params)
  },

  //查询获取一条role信息
  findById: id => {
    return API.GET('/api-admin/job/userId/'+id)
  },

  add: params => {
    return API.POST(`/api-admin/job`, params)
  },
  edit: (params) => {
    return API.PUT('/api-admin/job', params)
  },

  remove: params=>{
    return API.DELETE('/api-admin/job', params)
  },
    changeJobStatus: params=>{
        return API.GET('/api-admin/job/changeJobStatus', params)
    },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/roles/batch/${ids}`)
  }

}
