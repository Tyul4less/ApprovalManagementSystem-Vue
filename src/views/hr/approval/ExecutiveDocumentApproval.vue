<template >
  <div style="width:1050px; height: auto; margin: 10% auto; display:flex">
    <BCard class="divBox">
      <!-- 제목 -->
      <div style="height: 20px; text-align: center">
        <input v-model="openDocumentContent.title" type="text" style="width: 90%; height: 100%; border: none; background-color: white" disabled>
        <hr style="margin-top: 5px"/>
      </div>
      <!-- 형식 -->
      <div style="display: inline-flex; margin-top: 30px">
        <h5 style="width: 60px;">형식 :</h5>
        <b-form-input v-model="openDocumentContent.typeName" required style="height: 30px; width: 60px; background-color: white" disabled/>
      </div>
      <div style="display: inline-flex; margin-top: 30px">
        <h5 style="width: 60px;">이름 :</h5>
        <b-form-input v-model="openDocumentContent.empName" required style="height: 30px; width: 70px; background-color: white" disabled/>
      </div>
      <div style="display: inline-flex; margin-top: 30px">
        <h5 style="width: 80px;">문서번호 :</h5>
        <b-form-input v-model="openDocumentContent.documentNumber" required style="height: 30px; width: 120px; background-color: white" disabled/>
      </div>
      <!-- 텍스트 박스 -->
      <body>
        <textarea v-model="openDocumentContent.content" style="width: 100%; height: 200px; margin-top: 10px; background-color: white" disabled></textarea>
      </body>
      <!-- 의견 박스 -->
      <div :style="opinionStyle">
        <b-form-textarea
            ref="opinion"
            v-model="opinion"
            placeholder="의견을 입력해 주세요..."
            rows="3"
            max-rows="6"
        />
      </div>
      <div>
        <b-button style="margin-left: 190px" variant="outline-info" @click="opinionDiv">의견 달기</b-button>
        <b-button variant="success" @click="approval($event)" value="ST03">승인</b-button>
        <b-button variant="danger" @click="approval($event)" value="ST04">반려</b-button>
        <b-button variant="primary" @click="$router.go(-1)">뒤로가기</b-button>
      </div>
    </Bcard>
    <BCard class="divBox" style="float:right; margin-top:0;height: 370px; width: 500px">
      <h4>결재 상태</h4>
      <div style="border-radius: 10px; border: 1px solid black; height: 300px; overflow-y: auto">
        <div style="height: 30px; border-bottom: 1px solid black; display: flex" v-for="(item, index) in openDocumentContent.executives" :key="index">
          <div style="width: 10%; text-align: center; border-right: 1px solid black">{{ index }}</div>
          <div style="width: 35%">부서 : {{ item.deptName }}</div>
          <div style="width: 25%">직급 : {{ item.positionName }}</div>
          <div style="width: 30%">이름 : {{ item.empName }}</div>
          <div style="width: 30%">결재 : {{ isApproval(item.sequence) }}</div>
        </div>
      </div>
    </BCard>

  </div>
</template>
<script>
  import { mapState } from "vuex";
  import router from "@/router";

  export default {
      computed:{
        ...mapState({
          openDocumentContent : state => state.hr.approval.documentInfo,
          empData : state => state.hr.emp.empData,
        })
      },
      data(){
        return {
          executive : [],
          isSpread  : false,
          isOpinionOpen : false,
          opinion   : '',
          opinionStyle : {
            'overflow-y' :'auto',
            'height' : '0px',
            'transition' : 'all ease-in-out 0.5s'
          }
        }
      },
      methods:{
        showMe(){
          console.log(this.openDocumentContent)
        },
        approval(e){
          const status = e.target.value
          let approvalData = [];

          approvalData = approvalData.concat({
            documentNumber: this.openDocumentContent.documentNumber,
            empNumber : this.empData.empNumber,
            status,
            total: this.openDocumentContent.total,
            opinion: this.opinion,
            sequence: this.openDocumentContent.sequence
          })
          console.log(approvalData)
          this.$store.dispatch('hr/approval/approvalSign', approvalData)

          let msg = ''
          if(status === 'ST03') msg = '승인'
          if(status === 'ST04') msg = '반려'
          this.$swal.fire({
            icon: 'success',
            title: `${msg}하였습니다.`,
            text: '이전 페이지로 돌아갑니다',
            confirmButtonText: '돌아가기',
          }).then(() => ( router.go(-1) ))
        },
        setDate() {
          const date = new Date()
          const year = date.getFullYear()
          const month = date.getMonth()+1
          const day = date.getDay()
          return `${year}${('00'+month).slice(-2)}${('00'+day).slice(-2)}`
        },
        isApproval(sequence){
          let isApproval = ''
          if(this.openDocumentContent.sequence > sequence){
            isApproval = '승인'
          } else {
            isApproval = '대기'
          }
          return isApproval
        },
        opinionDiv(){
          if(this.isOpinionOpen){
          this.opinionStyle.height = '0'
            this.isOpinionOpen = false
          }else{
            this.opinionStyle.height = '100px'
            this.isOpinionOpen = true
          }
        },
      }
    }
</script>
<style>
  .divBox{
    width: 500px;
    height: auto;
    box-shadow: rgba(0,0,0,0.3) 0px 4px 20px 0px;
    border-radius: 15px;
    margin: auto
  }
</style>