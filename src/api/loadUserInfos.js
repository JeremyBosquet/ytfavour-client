import instance from './instance'

async function loadUserInfos() {
    await instance.get('/profil').then((response) => {
        if (response === undefined) {
            localStorage.setItem('logged', false)
            localStorage.removeItem('user')
            instance.defaults.headers.common['authorization'] = `Bearer`
        }
    })
}

instance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.config.url !== '/refreshToken' && error.response.status === 401 && originalRequest._retry !== true) {
        originalRequest._retry = true; 
        if(localStorage.getItem('user') && localStorage.getItem('user') !== ''){
            instance.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('user')}`
            await instance.post('/refreshToken').then((response) => {
                instance.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}`
                originalRequest.headers['authorization'] = `Bearer ${response.data.accessToken}`
                //localStorage.setItem('logged', true)
            }).catch((err) => {
                console.log('err')
                localStorage.removeItem('user');
                localStorage.setItem('logged', false)
                instance.defaults.headers.common['authorization'] = `Bearer`
            });
            return instance(originalRequest);
        }
    }
})

export default loadUserInfos