import * as API from './'

export default {
	list: params => {
	return API.GET('/api-cms/blogComments', params)
},
add: params => {
	return API.POST(`/api-cms/blogComments/save`, params)
},
edit: params => {
	return API.PUT(`/api-cms/blogComments/update`, params)
},
getblogid:params =>{
	return API.GET('/api-cms/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-cms/blogComments', params)
}
}
