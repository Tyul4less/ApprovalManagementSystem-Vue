import actions from './action'
import mutations from './mutation'

export default {
    namespaced: true,
    state: {
        waitingDocument: [],
        documentInfo:[],
        applicationDocumentList: [],
        myDocumentInfo: [],
        tmpDocumentList: [],
        tmpDocumentInfo: [],
    },
    mutations,
    actions
}