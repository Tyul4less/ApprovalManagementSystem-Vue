export default {
    SET_EMP_DATA (state, empData){
        state.empData = []
        state.empData = empData
        window.sessionStorage.setItem('empData', JSON.stringify(empData))
    },
    LOG_OUT (state){
        state.empData = []
    },
    SET_EXECUTIVES (state, selectExecutives){
        console.log("임직원들 가져옴")
        state.executivesList = selectExecutives
        console.log(state.executivesList)
    },
    SET_EMP_LIST (state, empList){
        state.empList = empList
    }
}