import * as axios from 'axios';

const instance = axios.create({
    baseURL: '/'
});

export const friendsAPI = {
    getFriends(pageNumber=1, pageSize=3, search=''){
        return instance.post(`api/friends?pageNumber=${pageNumber}&pageSize=${pageSize}`, {search}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => res.data)
        .catch(e => e.response.data);
    },
    addFriend(id){
        return instance.post('api/friends/add', {id}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => res.data)
        .catch(e => e.response.data);
    },
    removeFriend(id){
        return axios({method: 'delete', url: 'api/friends/remove', data: {id}, headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => res.data)
        .catch(e => e.response.data);
    },
};

export const usersAPI = {
    getUsers(pageNumber=1, pageSize=3, search=''){
        return instance.post(`api/users?pageNumber=${pageNumber}&pageSize=${pageSize}`, {search}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => res.data)
        .catch(e => e.response.data);
    }
};


export const postsAPI = {
    addPost(img, text, to){
        const formData = new FormData();
        formData.append('img', img);
        formData.append('text', text);
        formData.append('to', to);
        return instance.post('/api/posts/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.data)
        .catch(e => e.response.data);
    },
    getPosts(id, portion, currentPage){
        return instance.post('/api/posts/get', {id, portion, currentPage}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>{ return res.data})
        .catch(e=>{ return e.response.data});
    },
    removePost(id){
        return instance.post('/api/posts/remove', {id}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>{ return res.data})
        .catch(e=>{ return e.response.data});
    },
    likePost(id, me){
        return instance.post('/api/posts/like', {id, me}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>{ return res.data})
        .catch(e=>{ return e.response.data});
    },
    dislikePost(id, me){
        return instance.post('/api/posts/dislike', {id, me}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>{ return res.data})
        .catch(e=>{ return e.response.data});
    }
};


export const profileAPI = {
    getProfile(id){
        return instance.get(`api/profile/${id}`)
        .then(res => res.data)
        .catch(e => e.response.data);
    },
    saveSmallPhoto(smallImg){
        const formData = new FormData();
        formData.append('smallImg', smallImg);
        return instance.post(`api/profile/smallImg`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.data)
        .catch(e => e.response.data);
    },
    saveBigPhoto(bigImg){
        const formData = new FormData();
        formData.append('bigImg', bigImg);
        return instance.post(`api/profile/bigImg`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.data)
        .catch(e => e.response.data);
    },
    saveStatus(status){
        return instance.post('api/profile/status', {status}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    },
    saveCity(city){
        return instance.post('api/profile/city', {city}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    },
    saveBirth(birth){
        return instance.post('api/profile/birth', {birth}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    },
    saveEducation(education){
        return instance.post('api/profile/education', {education}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    },
    savePhone(phone){
        return instance.post('api/profile/phone', {phone}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    },
    saveBook(book){
        return instance.post('api/profile/book', {book}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    }
};

export const authAPI = {
    register(email, password, name, surname, city){
        return instance.post('api/auth/register', {email, password, name, surname, city})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    },
    login(email, password){
        return instance.post('api/auth/login', {email, password})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    },
    verify(){
        return instance.get('api/auth/verify', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    }
};


export const newsAPI = {
    getNews(portion, currentPage){
        return instance.get(`api/news?portion=${portion}&currentPage=${currentPage}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data);
    }
};


export const musicAPI ={
    getAllMusic(search='', portion, currentPage){
        return instance.post('api/music/all', {search, portion, currentPage}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data); 
    },
    getMyMusic(search='', portion, currentPage){
        return instance.post('api/music/my', {search, portion, currentPage}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data); 
    },
    addMyMusic(id){
        return instance.post('api/music/add', {id}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data); 
    },
    deleteMyMusic(id){
        return instance.post('api/music/delete', {id}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data); 
    }
};

export const messageAPI = {
    getMessagesMenu(portion, currentPage){
        return instance.get(`api/messages/menu?portion=${portion}&currentPage=${currentPage}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data); 
    },
    getMessages(id, portion, currentPage){
        return instance.get(`api/messages/${id}?portion=${portion}&currentPage=${currentPage}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res=>res.data)
        .catch(e=>e.response.data); 
    },
    addMesagge(img, text, to){
        const formData = new FormData();
        formData.append('img', img);
        formData.append('text', text);
        formData.append('to', to);
        return instance.post('/api/messages/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.data)
        .catch(e => e.response.data);
    },
    createDialog(to){
        return instance.post('api/messages/create', {to}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => res.data)
        .catch(e => e.response.data);
    }
};