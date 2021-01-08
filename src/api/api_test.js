import * as API from './'

export default {
	list: params => {
	return API.GET('/api-exam/test', params)
},
add: params => {
	return API.POST(`/api-exam/test/save`, params)
},
edit: params => {
	return API.PUT(`/api-exam/test/update`, params)
},
getblogid:params =>{
	return API.GET('/api-cms/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-exam/test', params)
}
}
