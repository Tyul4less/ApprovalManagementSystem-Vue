import { findEmpInfo, registEmp, findExecutive, withdrawEmp, findAllEmp, editEmpInfo } from '@/api/hr/emp'
import router from "@/router";


export default {
    async login ({commit}, account) {
        try{
            const empData = await findEmpInfo(account)
            console.log(empData)
            if(empData.data.empNumber !== null){
                commit('SET_EMP_DATA', empData.data)
            }
        } catch ( err ) {
            throw new Error(err)
        }
    },
    logOut ({commit}){
        commit('LOG_OUT')
        router.push({name : 'LoginPage'})
    },
    async registEmp (_, registData) {
        try{
            await registEmp(registData)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async findExecutive ({ commit }) {
        try{
            const selectExecutives = await findExecutive()
            commit('SET_EXECUTIVES', selectExecutives.data)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async findAllEmp ({ commit }, empSearchOption) {
        try{
            const empList = await findAllEmp(empSearchOption)
            console.log(empList.data)
            commit('SET_EMP_LIST', empList.data)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async withdrawEmp (_, empNumber) {
        try{
            console.log(empNumber)
            await withdrawEmp(empNumber)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async editEmpInfo (_, empInfo) {
        try{
            console.log(empInfo)
            await editEmpInfo(empInfo)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async userCertified (_, empInfo) {
        try{
            console.log(empInfo)
            const empAccess = await findEmpInfo(empInfo)
            console.log(empAccess)
            if(empAccess.data !== '' ){
                return 'success'
            } else {
                return 'fail'
            }
        } catch ( err ) {
            return Error(err)
        }
    },
}
