import actions from './action'
import mutations from './mutation'

export default {
    namespaced: true,
    state: {
        empData: [{
            empId: '',
            empName: '',
            empNumber: '',
            deptName: '',
            deptCode: '',
            positionName: '',
            positionCode: '',
        }],
        executives: [],
        executivesList: [],
        empList : [
            {
                deptCode: '',
                deptName: '',
                empId: '',
                empPw: '',
                empName: '',
                empNumber: '',
                positionCode: '',
                positionName: '',
                joinDate: '',
                withdrawDate: '',
                status: '',
                statusName: '',
            }
        ],
    },
    mutations,
    actions
}