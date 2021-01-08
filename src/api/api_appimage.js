import * as API from './'

export default {
	list: params => {
	return API.GET('/api-app/appimage', params)
},
add: params => {
	return API.POST(`/api-app/appimage/save`, params)
},
edit: params => {
	return API.PUT(`/api-app/appimage/update`, params)
},
getblogid:params =>{
	return API.GET('/api-app/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-app/appimage', params)
}
}
