import * as API from './'

export default {
	list: params => {
	return API.GET('/api-shop/cartlist', params)
},
add: params => {
	return API.POST(`/api-shop/cartlist/save`, params)
},
edit: params => {
	return API.PUT(`/api-shop/cartlist/update`, params)
},
getblogid:params =>{
	return API.GET('/api-shop/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-shop/cartlist', params)
}
}
