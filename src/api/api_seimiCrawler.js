import * as API from './'

export default {
	list: params => {
	return API.GET('/api-base/SeimiCrawler', params)
},
    basic: params => {
	return API.GET(`/api-base/SeimiCrawler/basic`, params)
},
    seleniumhq: params => {
	return API.GET(`/api-base/SeimiCrawler/seleniumhq`, params)
},
    screw:params =>{
	return API.GET('/api-base/SeimiCrawler/screw',params)
},
remove: params=>{
	return API.DELETE('/api-exam/person', params)
}
}
