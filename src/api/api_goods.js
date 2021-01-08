import * as API from './'

export default {
	list: params => {
	return API.GET('/api-shop/goods', params)
},
add: params => {
	return API.POST(`/api-shop/goods/save`, params)
},
edit: params => {
	return API.PUT(`/api-shop/goods/update`, params)
},
getblogid:params =>{
	return API.GET('/api-shop/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-shop/goods', params)
}
}
