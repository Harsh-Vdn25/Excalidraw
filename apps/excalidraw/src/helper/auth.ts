import axios from 'axios'
interface AuthType{
    isSignin:boolean;
    username:string;
    password:string;
    name?:string;
}
export async function AuthRequest({isSignin,username,password,name}:AuthType){

}