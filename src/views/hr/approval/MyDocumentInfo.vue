<template >
  <div style="width:1000px; height: auto; margin: 10% auto;">
    <BCard style="width: 1000px; height: auto;  box-shadow: rgba(0,0,0,0.3) 0px 4px 20px 0px; border-radius: 15px;">
      <div style="width: 500px; height: 500px; border-right: 1px solid rgba(116, 116, 116, 0.5); padding-right: 8px; float: left">
        <!-- 제목 -->
        <div style="height: 20px; text-align: center">
          <input v-model="documentContent.title" type="text" style="width: 90%; height: 100%; border: none; background-color: white" :disabled="disabled">
          <hr style="margin-top: 5px"/>
        </div>

        <!-- 형식 -->
        <div style="display: inline-flex; margin-top: 30px">
          <h5 style="width: 60px;">형식 :</h5>
          <b-form-input v-model="documentContent.typeName" required style="height: 30px; width: 80px;" disabled/>
        </div>

        <!-- 컨텐츠 -->
        <body>
          <b-form-textarea
              id="textarea"
              v-model="documentContent.content"
              rows="3"
              max-rows="6"
              style="width: 100%; height: 200px; margin-top: 10px; background-color: white"
              :disabled="disabled"
          />
          <!-- 의견 -->
          <b-form-textarea
              id="textarea"
              v-model="opinion"
              rows="3"
              max-rows="6"
              style="width: 100%; height: 200px; margin-top: 10px; background-color: white"
              disabled
          />
        </body>


      </div>
      <!-- 우측 -->
      <div style="float: right; width: 460px;">
        <!-- 임직원 목록 -->
        <div class="executiveList">
          <p style="font-size: 15px; width: 100%; margin:0">현재 서류 상태<tempate style="color:hotpink">(임직원을 클릭하시면 의견을 볼 수 있습니다.)</tempate></p>
          <div style="display: inline-flex; margin: 0 5px 0 5px; width: 100%;"
               v-for="(item, index) in documentContent.executives"
               :key="index"
          >
            <div @click="this.opinion=this.documentContent.executives[index].opinion">
              <b-input-group :prepend="index+1" style="width: 800px;">
                <input type="text" :value="'부서 : '+item.deptName" disabled style="background-color: white; width: 130px; border-right: none"/>
                <input type="text" :value="'직급 : '+item.positionName" disabled style="background-color: white; width: 80px; border-left: none; border-right: none"/>
                <input type="text" :value="'이름 : '+item.empName" disabled style="background-color: white; width: 100px; border-left: none; border-right: none"/>
                <input type="text" :value="'상태 : '+item.statusName" disabled :style="setStatusStyle(item.status, item.empNumber)"/>
              </b-input-group>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 5px; width: 100%; display: inline-flex; float: right; height: 30px">
        <div style="width: 100%">
          <div v-if="this.documentContent.status === 'ST03'"
               style="margin: 8px; font-size: 15px; color: blue; font-weight: bold; width: 480px;">
            문서가 승인 되었습니다.
          </div>
          <div v-if="this.documentContent.status === 'ST04'"
               style="margin: 8px; font-size: 15px; color: red; font-weight: bold; width: 480px;">
            문서가 반려되었습니다. 수정해서 다시 제출하시거나 취하하여 주시기 바랍니다.
          </div>
          <div style="display: flex; float : right; margin-top: -40px">
            <b-button style="margin-right: 5px" variant="danger" @click="documentDrop" value="승인">취하</b-button>
            <b-button style="margin-right: 5px" variant="warning" @click="documentEdit" value="승인" v-if="this.documentContent.status === 'ST04'">수정</b-button>
            <b-button style="margin-right: 5px" variant="success" @click="editDocumentContent" v-show="!disabled">다시제출</b-button>
            <b-button style="margin-right: 5px" variant="primary" @click="$router.go(-1)">뒤로가기</b-button>
          </div>
        </div>
      </div>
    </Bcard>

  </div>
</template>
<script>
  import { mapState } from "vuex";
  import router from "@/router";
  import _ from 'lodash'

  export default {
      mounted(){

      },
      computed:{
        ...mapState({
          empData : state => state.hr.emp.empData,
          myDocumentInfo : state => state.hr.approval.documentInfo,
        })
      },
      data(){
        return {
          documentContent:[{
            title:'',
            typeName:'',
            content:'',
          }],
          executive:[],
          opinion:'',
          editMode:false,
          disabled:true,
          returnExecutive: 0,
        }
      },
    created() {
      this.documentContent = _.clone(this.myDocumentInfo)
    },
    methods:{
      showMe(){
        console.log(this.myDocumentInfo)
        console.log(this.documentContent)
      },
        documentDrop(){
          this.$swal.fire({
            icon:'question',
            title: '취하하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '취하하기',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$store.dispatch('hr/approval/documentDrop', this.myDocumentInfo.documentNumber)
              this.$swal.fire({
                icon:'success',
                title: '완료!',
                confirmButtonText: '돌아가기',
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push({name: 'DocumentList'})
                }
              })
            }
          })
        },
        createExecutiveValue(deptName, positionName){
          console.log('작동안함?')
          return `부서 : ${deptName} 직급 : ${positionName}`
        },
        setStatusStyle(status, executiveNumber){
          let statusStyle = {
            'background-color': 'white',
            'width': '100px',
            'border-left': 'none',
            'color' : 'blue'
          }
          if(status === 'ST03') { statusStyle.color = 'blue'}
          if(status === 'ST04') {
            statusStyle.color = 'red'
            this.returnExecutive = executiveNumber
          }
          if(status === 'ST01') { statusStyle.color = 'black'}
          return statusStyle
        },
        documentEdit(){
          if(this.editMode && this.myDocumentInfo.status === 'ST04'){
            this.$swal.fire({
              title: '작성을 취소하시겠습니까?',
              text: '취소시 작성전 상태로 되돌아갑니다.',
              showCancelButton: true,
              confirmButtonText: '작성 취소',
              cancelButtonText: '닫기',
            }).then((result) => {
              if (result.isConfirmed) {
                this.editMode = false
                this.disabled = true
                this.documentContent = _.clone(this.myDocumentInfo)
              }
            })
          }else{
            this.editMode = true
            this.disabled = false
          }
        },
        editDocumentContent(){
          this.$store.dispatch('hr/approval/editDocumentContent', {
            documentNumber: this.documentContent.documentNumber,
            title: this.documentContent.title,
            content: this.documentContent.content,
            executives: [{empNumber : this.returnExecutive}]
          }).then(() => {
            this.$router.push({ name : 'DocumentList' })
          })
        }
      }
    }
</script>
<style>
  .executiveList{
    border-radius: 5px;
    min-height: 50px;
  }
</style>