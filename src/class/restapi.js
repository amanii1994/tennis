import Constants from '../constants';
import { AsyncStorage } from 'react-native';
export default restapi = {
    // getApiUrl: function(url){
    //     return apiUrl+ url;
    // },
    post: function (url, data) {
        return new Promise((resolve, reject) => {
            let postData = new FormData();
            for (let x in data) {
                postData.append(x, data[x]);
            }
            console.log(postData);
            fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: postData,
            }).then((res) => {
                console.log(res);
                resolve(res.json());
            }).catch((err) => {
                reject(err);
            }).done();
        });
    },

    get: function (url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((res) => {
                console.log(res);
                resolve(res.json());
            }).catch((err) => {
                reject(err);
            });
        });
    },
  
    async getCurrentUser(key) {
        var collect;
        try {
            var value = await AsyncStorage.getItem(key).then(
                (values) => {
                    collect= JSON.parse(values);
                });
        } catch (error) {
            collect = error
        }
        return collect;
    },
    async saveAppoint(data) {
        let url = Constants.API_URL + 'object=app&action=createAppoint';
        let res = await this.post(url, data);
        return res; 
    },
    async saveAppointReward(data) {
        let url = Constants.API_URL + 'object=app&action=createAppointReward';
        let res = await this.post(url, data);
        return res; 
    },
    async saveAppointGuest(data) {
        console.log(data);
        let url = Constants.API_URL + 'object=app&action=createAppointGuest';
        let res = await this.post(url, data);
        return res; 
    }
}