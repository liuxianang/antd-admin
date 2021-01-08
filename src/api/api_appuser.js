import * as API from './'

export default {
	list: params => {
	return API.GET('/api-app/appuser', params)
},
add: params => {
	return API.POST(`/api-app/appuser/save`, params)
},
edit: params => {
	return API.PUT(`/api-app/appuser/update`, params)
},
getblogid:params =>{
	return API.GET('/api-app/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-app/appuser', params)
}
}
