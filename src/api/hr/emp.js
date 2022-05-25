//import { hrApi} from "@/api";

import axios from "axios";
const api = axios.create({
    baseURL : 'http://localhost:9999'
})

function findEmpInfo(empData){
    console.log("로그인 데이터"+JSON.stringify(empData))
    return api.post('/findEmpInfo', empData)
}
function registEmp(registData){
    console.log(registData)
    api.post('/registEmp', ...registData)
}
function findExecutive(){
    return api.post('/findExecutive')
}
function searchEmpListByCondition(searchEmpOption){
    return api.post('/searchEmpListByCondition', searchEmpOption)
}
function findAllEmp(empSearchOption){
    return api.post('/findAllEmp', empSearchOption)
}
function withdrawEmp(empNumber){
    api.post('/withdrawEmp', empNumber)
}
function editEmpInfo(empInfo){
    api.post('/editEmpInfo', ...empInfo)
}
function userCertified(empInfo){
    api.post('/findEmpInfo', empInfo)
}

export { findEmpInfo, registEmp, findExecutive, findAllEmp, searchEmpListByCondition, withdrawEmp, editEmpInfo, userCertified }