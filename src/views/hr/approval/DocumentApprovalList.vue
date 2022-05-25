<template >
  <div style="width:800px; height: auto; margin: 10% auto">
    <BCard style="width: auto; height: 500px;  box-shadow: rgba(0,0,0,0.3) 0px 4px 20px 0px; border-radius: 15px; text-align: center; overflow-y: auto">
      <h2> 결재 대기 문서</h2>
      <div>
        <div style="display: flex; font-weight:bold">
          <div style="border: 1px solid black; width: 50px">번호</div>
          <div style="border: 1px solid black; width: 60px">성명</div>
          <div style="border: 1px solid black; width: 100px">문서 번호</div>
          <div style="border: 1px solid black; width: 170px">신청 날짜</div>
          <div style="border: 1px solid black; width: 280px">제목</div>
          <div style="border: 1px solid black; width: 80px">상태</div>
        </div>

        <div style="display: flex" v-for="( item, index ) in waitingDocument" :key="index">
          <div style="border: 1px solid black; width: 50px">{{ index+1 }}</div>
          <div style="border: 1px solid black; width: 60px">{{ item.empName }}</div>
          <div style="border: 1px solid black; width: 100px">{{ item.documentNumber }}</div>
          <div style="border: 1px solid black; width: 170px">{{ dateConverter(item.date) }}</div>
          <div style="border: 1px solid black; width: 280px" class="title" @click="openDocument($event)" :id="item.documentNumber">{{ item.title }}</div>
          <div style="border: 1px solid black; width: 80px">{{ item.status }}</div>
        </div>
      </div>
    </Bcard>

    <b-button variant="success" @click="signUp">저장</b-button>
    <b-button variant="danger" @click="$router.push({ name : 'MainPage'})">나가기</b-button>
  </div>
</template>
<script>
  import { mapState } from "vuex";

  export default {
    computed:{
      ...mapState({
        empData : state => state.hr.emp.empData,
        waitingDocument : state => state.hr.approval.waitingDocument
      })
    },
    created() {
      this.$store.dispatch('hr/approval/getWaitingDocumentList', { empNumber : this.empData.empNumber } )
    },
    mounted() {
      console.log(this.waitingDocument)
    },
    data(){
        return {
          documentContent:[{
            title:'',
            type:'',
            content:'',
          }],
          executive:[],
          documentList : [],
        }
      },
      methods:{
        signUp(){

          let document = this.documentContent.concat()
          document[0].empNumber = this.empData.empNumber

          let executiveArray = []
          this.executive.map(e => {
            if(e !== true && e !== false){
              executiveArray = executiveArray.concat(e)
            }
          })

          document[0].executive = executiveArray
          const day = this.setDate();
          document[0].documentNumber = `${day}`

          console.log(document)
          this.$store.dispatch('hr/approval/signUp', document)
        },
        setDate() {
          const date = new Date()
          const year = date.getFullYear()
          const month = date.getMonth()+1
          const day = date.getDay()
          console.log(month)
          const documentNumber = `${year}${('00'+month).slice(-2)}${('00'+day).slice(-2)}`
          console.log(documentNumber)
          return documentNumber
        },
        showMe(){
          console.log(this.documentList)
        },
        openDocument(e){
          this.$store.dispatch('hr/approval/getDocumentInfo', { documentNumber : e.target.id })
          this.$router.push({ name : 'ExecutiveDocumentApproval'})
        },
        dateConverter(date){
          return date.replace('T', ' ')
        },
      }
    }
</script>
<style>
.title{
  cursor: pointer;
}
.title:hover{
  color: orchid;
}
</style>