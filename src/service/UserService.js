import axios from 'axios'

export class UserService{
    baseUrl="http://localhost:8080/api/user/";

    getAll(){
        return axios.get(this.baseUrl + "All").then(res=> res.data);
    }

    save(user){
        return axios.post(this.baseUrl + "save", user).then(res => res.data);
    }

}