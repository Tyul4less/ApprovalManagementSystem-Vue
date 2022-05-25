import { signUp, getWaitingDocumentList, approvalSign, getApplicationDocumentList, getDocumentInfo,
        documentDrop, getTmpDocumentList, editDocumentContent } from '@/api/hr/approval'

export default {
    async signUp(_, document) {
        try{
            await signUp(document)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async getWaitingDocumentList({ commit }, empNumber) {
        try{
            const waitingDocument = await getWaitingDocumentList(empNumber)
            commit('SET_WAITING_DOCUMENT', waitingDocument.data)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async approvalSign(_, approvalData) {
        try{
            await approvalSign(approvalData)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async getApplicationDocumentList({ commit }, empNumber) {
        try{
            const documentList = await getApplicationDocumentList(empNumber)
            commit('SET_APPLICATION_DOCUMENT_LIST', documentList.data)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async documentDrop(_, documentNumber) {
        try{
            await documentDrop(documentNumber)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async getTmpDocumentList({ commit }, empNumber) {
        try{
            const tmpDocumentList = await getTmpDocumentList(empNumber)
            commit('SET_TMP_DOCUMENT_LIST', tmpDocumentList.data)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async getDocumentInfo({ commit }, documentNumber) {
        try{
            const documentInfo = await getDocumentInfo(documentNumber)
            commit('SET_DOCUMENT_INFO', documentInfo.data)
        } catch ( err ) {
            throw new Error(err)
        }
    },
    async editDocumentContent(_, documentData) {
        try{
            await editDocumentContent(documentData)
        } catch ( err ) {
            throw new Error(err)
        }
    }
}
