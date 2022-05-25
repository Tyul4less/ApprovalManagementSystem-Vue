export default {
    SET_WAITING_DOCUMENT (state, waitingDocument){
        state.waitingDocument = waitingDocument;
    },
    SET_APPLICATION_DOCUMENT_LIST (state, documentList){
        state.applicationDocumentList = documentList
    },
    SET_TMP_DOCUMENT_LIST (state, tmpDocumentList){
        state.tmpDocumentList = tmpDocumentList
    },
    SET_DOCUMENT_INFO (state, documentInfo){
        state.documentInfo = documentInfo
    },
}