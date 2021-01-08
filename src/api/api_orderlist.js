import * as API from './'

export default {
	list: params => {
	return API.GET('/api-shop/orderlist', params)
},
add: params => {
	return API.POST(`/api-shop/orderlist/save`, params)
},
edit: params => {
	return API.PUT(`/api-shop/orderlist/update`, params)
},
getblogid:params =>{
	return API.GET('/api-shop/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-shop/orderlist', params)
}
}
