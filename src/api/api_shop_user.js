import * as API from './'

export default {
	list: params => {
	return API.GET('/api-shop/user', params)
},
add: params => {
	return API.POST(`/api-shop/user/save`, params)
},
edit: params => {
	return API.PUT(`/api-shop/user/update`, params)
},
getblogid:params =>{
	return API.GET('/api-shop/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-shop/user', params)
}
}
