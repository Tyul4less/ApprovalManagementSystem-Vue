import axios from "axios";

/*const headers = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*!/!*'
}*/

const api = axios.create({
    baseURL : 'http://localhost:9999'
})

    function signUp(document){
        const documentContent = document[0]
        api.post('/signUp',
            documentContent
        )
    }
    function getWaitingDocumentList(empNumber){
        return api.post('/getWaitingDocumentList', empNumber )
    }
    function approvalSign(approvalData){
        api.post('/approvalSign', approvalData[0] )
    }
    function getApplicationDocumentList(empNumber){
        console.log(empNumber)
        return api.post('/getApplicationDocumentList', { empNumber } )
    }
    function getDocumentInfo(documentNumber){
        console.log(documentNumber)
        return api.post('/getDocumentInfo', documentNumber )
    }
    function documentDrop(documentNumber){
        console.log(documentNumber)
        api.delete('/documentDrop', { params : { documentNumber } })
    }
    function getTmpDocumentList(empNumber){
        console.log(empNumber)
        return api.post('/getTmpDocumentList', { empNumber })
    }
    function editDocumentContent(documentData){
        console.log(documentData)
        return api.post('/editDocumentContent', documentData )
    }

export { signUp, getWaitingDocumentList, approvalSign, getApplicationDocumentList, getTmpDocumentList, documentDrop, getDocumentInfo, editDocumentContent
     }