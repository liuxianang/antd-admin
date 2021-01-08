import * as API from './'

export default {
	list: params => {
	return API.GET('/api-exam/question', params)
},
add: params => {
	return API.POST(`/api-exam/question/save`, params)
},
edit: params => {
	return API.PUT(`/api-exam/question/update`, params)
},
getblogid:params =>{
	return API.GET('/api-cms/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-exam/question', params)
}
}
