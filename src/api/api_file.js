import * as API from './'

export default {
  files: params => {
    return API.GET('/api-cms/file', params)
  },
  getToken:params =>{
    return API.GET('/api-cms/file/getToken',params)
  },
  remove: params=>{
    return API.DELETE('/api-cms/file', params)
  },
    upload:params =>{
        return API.POST('/api-cms/file/upload',params)
},
    edit: params => {
        return API.PUT('/api-cms/file/update',params)
    },
}
