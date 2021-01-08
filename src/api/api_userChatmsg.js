import * as API from './'

export default {
    getchatlist: params => {
	return API.GET('/api-admin/chat/chatlist', params)
},
    getchatmylist: params => {
        return API.GET('/api-admin/chat/chatmylist', params)
    },
    getuseronline: params => {
        return API.GET('/api-admin/chat/useronline', params)
    },
    getnotice: params => {
        return API.GET('/api-admin/notice', params)
    },
pushmsg: params => {
	return API.GET(`/api-admin/chat/pushmsg`, params)
},
    pushmsgall: params => {
        return API.GET(`/api-admin/chat/pushall`, params)
    },
    tokenUser: params =>{
        return API.GET('/api-admin/user/currentUser',params)
    },
edit: params => {
	return API.PUT(`/api-admin/chat/push/11`, params)
},
getblogid:params =>{
	return API.GET('/api-cms/blog/blogid',params)
},
remove: params=>{
	return API.DELETE('/api-exam/userChatmsg', params)
}
}
