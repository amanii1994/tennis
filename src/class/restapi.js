import Constants from '../constants';
const apiUrl = Constants.WITHOUT_AUTH_API_URL;
export default restapi = {
    getApiUrl: function(url){
        return apiUrl+ url;
    },
    post: function (url, data) {
        
        return new Promise((resolve, reject) =>{
            let postData = new FormData();
            for(let x  in data)
            {
                postData.append(x , data[x]);
            }
            fetch( this.getApiUrl(url), {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: postData,
            }).then((res) =>{ 
                resolve(res.json());
            }).catch((err)=>{
                reject(err);
            }); 
        });  
    },

    get: function (url) { 
        return new Promise((resolve, reject) =>{
            fetch(this.getApiUrl(url)).then((res) =>{ 
                resolve(res.json());
            }).catch((err)=>{
                reject(err);
            }); 
        });  
    }
}