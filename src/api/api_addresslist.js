import * as API from './'

export default {
	list: params => {
	return API.GET('/api-shop/addresslist', params)
},
add: params => {
	return API.POST(`/api-shop/addresslist/save`, params)
},
edit: params => {
	return API.PUT(`/api-shop/addresslist/update`, params)
},
getblogid:params =>{
	return API.GET('/api-shop/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-shop/addresslist', params)
}
}
