<template >
  <div style="width:930px; height:auto ; margin: 8% auto;display: flex">
    <BCard style="width: 500px; height: auto; box-shadow: rgba(0,0,0,0.3) 0px 4px 20px 0px; border-radius: 10px">

      <h2 style="width: 100%; text-align: center">문서 작성</h2>


      <div style="border: 1px solid black; border-radius: 5px; height: 30px">
        <input v-model="documentContent[0].title" type="text" style="width: 95%; height: 100%; border: none; margin-left: 2.5%" placeholder="제목칸입니다.">
      </div>

      <div style="display: inline-flex; margin-top: 30px">
        <h5 style="width: 60px">유형 :</h5>
        <b-form-select style="width:80px; height: 30px;" v-model="documentContent[0].type" :options="typeOptions" size="sm"/>
      </div>

      <body>
        <textarea v-model="documentContent[0].content" style="width: 100%; height: 200px; margin-top: 10px"></textarea>
      </body>

      <!-- 임원진 선택 CheckBox -->


      <!-- 하단 버튼 -->
      <b-button variant="primary" @click="tmpDocumentModal">임시 저장한 문서 조회</b-button>
      <b-button variant="success" @click="signUp($event, '결재')" id="ST01" style="float: right">결재 신청</b-button>
      <b-button variant="primary" @click="signUp($event, '임시 저장')" id="ST02" style="float: right">문서 임시 저장</b-button>
      <b-button variant="danger" @click="cancel()" style="float: right">작성 취소</b-button>

    </Bcard>

    <!-- 우측 임원진 검색창 -->

    <BCard style="width: 410px; height: auto; box-shadow: rgba(0,0,0,0.3) 0px 4px 20px 0px; border-radius: 10px; margin-left: 20px">
      <h6>결재받을 임직원</h6>
      <hr style="margin:0"/>

      <div style="margin-top: 20px"/>
      <b-form-group label="부서">
        <b-form-select style="width:120px; height: 30px;" v-model="department" :options="deptOptions" size="sm" /><!-- @change="this.isChange = true" -->
      </b-form-group>

      <b-form-group label="직책">
        <b-form-select style="width:120px; height: 30px;" v-model="executive" :options="executiveOptions" size="sm" /><!-- @change="this.isChange = true" -->
      </b-form-group>
      <b-button squared variant="outline-secondary" style="height: 30px; font-size: 13px; margin-bottom: 10px" @click="searchExecutive">검색</b-button>

      <div style="display:flex">
            <b-form-select style="width:120px; height: 30px;" :options="searchedExecutiveOption" v-model="selectedExecutive" size="sm"/>
            <b-button squared variant="outline-secondary" style="height: 30px; font-size: 13px; margin-bottom: 10px" @click="executiveAddFunc">추가</b-button>
      </div>
      <div style="border: 1px solid black; width: 370px; height: 120px; margin:auto; overflow-y: auto">
        <template v-for="(item, index) in addExecutive" :key="index">
          <div style="width: 100%; display: flex">
            <div style="width: 134px; height: 30px; border-bottom: 1px solid black" v-if="item.departmentText !== ''">부서 : {{ item.departmentText }}</div>
            <div style="width: 134px; height: 30px; border-bottom: 1px solid black" v-if="item.departmentText !== ''">직급 : {{ item.executiveText }}</div>
            <div style="width: 134px; height: 30px; border-bottom: 1px solid black" v-if="item.departmentText !== ''">이름 : {{ item.searchedExecutive.empName }}</div>
          </div>
        </template>
      </div>

    </BCard>
  </div>



  <transition name="fade" mode="out-in">
    <CommonModal @close="this.modal=false" v-if="modal">

      <template v-slot:header>
        문서 제목을 클릭하시면 문서 내용이 현재 페이지에 반영됩니다.
      </template>

      <template v-slot:body>
        <h2 style="width: 100%; text-align: center;">임시 저장한 문서[{{ empData.empName }}]</h2>
        <div>
          <div style="display: flex; font-weight:bold; text-align: center">
            <div style="border: 1px solid black; width: 50px">순서</div>
            <div style="border: 1px solid black; width: 80px">성명</div>
            <div style="border: 1px solid black; width: 100px">문서 번호</div>
            <div style="border: 1px solid black; width: 180px">등록 날짜</div>
            <div style="border: 1px solid black; width: 220px">제목</div>
            <div style="border: 1px solid black; width: 65px">상태</div>
          </div>

          <div style="display: flex; text-align: center" v-for="( item, index ) in tmpDocumentList" :key="index">
            <div style="border: 1px solid black; width: 50px">{{ index+1 }}</div>
            <div style="border: 1px solid black; width: 80px">{{ item.empName }}</div>
            <div style="border: 1px solid black; width: 100px">{{ item.documentNumber }}</div>
            <div style="border: 1px solid black; width: 180px">{{dateConverter(item.date)}}</div>
            <div style="border: 1px solid black; width: 220px" class="title" @click="setDocument($event)" :id="item.documentNumber">{{ item.title }}</div>
            <div style="border: 1px solid black; width: 65px">{{ item.status }}</div>
          </div>
        </div>
      </template>

      <template v-slot:footer>
        <input class="btn btn-primary" type="button" @click="setDocument" value="열기"/>
        <input class="btn btn-primary" type="button" @click="this.modal=false" value="취소"/>
      </template>

    </CommonModal>
  </transition>


</template>
<script>
import {mapState} from "vuex";
import CommonModal from "@/components/modal/CommonModal";


export default {
    components:{
      CommonModal
    },
    created(){
        this.$store.dispatch('hr/emp/findExecutive')
    },
      computed:{
        ...mapState({
            empData : state => state.hr.emp.empData,
            executivesList : state => state.hr.emp.executivesList,
            tmpDocumentList : state => state.hr.approval.tmpDocumentList,
            tmpDocumentInfo : state => state.hr.approval.documentInfo,
          })
      },
      data(){
        return {
          modal: false,
          documentContent:[{
            title:'',
            type:'',
            content:'',
            documentNumber :'',
          }],
          typeOptions: [
            { value: 'VC01', text: '조퇴' },
            { value: 'VC02', text: '월차' },
            { value: 'VC03', text: '연차' },
            { value: 'VC04', text: '반차' },
          ],
          deptOptions:[
            {value:'DE01', text:'개발팀'},
            {value:'DE02', text:'웹디자인팀'},
            {value:'DE03', text:'총무팀'},
            {value:'DE04', text:'마케팅팀'},
            {value:'DE05', text:'기술지원팀'},
          ],
          executiveOptions:[
            {value:'PO04', text:'차장'},
            {value:'PO05', text:'부장'},
            {value:'PO06', text:'전무'},
            {value:'PO07', text:'이사'},
          ],
          executiveEmpList:[],
          department:'',
          executive:'',
          addExecutive:[],
          searchedExecutive:[{
            empName:'',
            empNumber: 0,
          }],
          //isChange: true,
          searchedExecutiveOption:[],
          selectedExecutive:0,
        }
      },
      methods:{
      /* 결재 신청 */
        signUp(e, question){

          /*예외처리*/
          if(this.addExecutive.length === 0) {
            this.$swal.fire({
              icon: 'error',
              title: '결재 받을 임원진을 선택하지 않았습니다.',
              text: '선택해주십시오.',
              confirmButtonText: '확인',
            })
            return
          }

          /* 서버쪽에 넘길 데이터 셋팅 */
          let document = this.documentContent.concat()
          document[0].empNumber = this.empData.empNumber
          document[0].status = e.target.id

          if(this.documentContent[0].documentNumber === ''){
            console.log('번호 새로 셋팅')
            document[0].documentNumber = this.createDocumentNumber('documentNumber')
          }
          document[0].date = this.createDocumentNumber('date')

          /* 임원진 셋팅 */
          let executiveArray = []
          this.addExecutive.map(e => {
            if(e.executiveText !== ''){
              executiveArray = executiveArray.concat({ empNumber : e.searchedExecutive.empNumber})
            }
          })

          /* 임원진의 수가 정해짐, 그걸로 승인횟수 구함 */
          const total = executiveArray.length

          document[0].executives = executiveArray
          document[0].total = total


          console.log(document)

          this.$swal.fire({
            icon:'question',
            title: `서류를 ${question}하시겠습니까?`,
            showCancelButton: true,
            confirmButtonText: '제출하기',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$store.dispatch('hr/approval/signUp', document)
              this.$swal.fire('Saved!', '', 'success').then(() => this.$router.go())
            }
          })
        },
        /* 임시 저장 문서 조회 모달 */
        tmpDocumentModal(){
          this.$store.dispatch('hr/approval/getTmpDocumentList', this.empData.empNumber)
          this.modal=true
        },
        /* 임시 저장 문서 제목 클릭시 셋팅 */
        setDocument(e){
          this.$store.dispatch('hr/approval/getDocumentInfo', { documentNumber : e.target.id } ).then(()=>{

            this.addExecutive = []

            console.log(this.tmpDocumentInfo.documentNumber)
            this.documentContent[0].title = this.tmpDocumentInfo.title
            this.documentContent[0].type = this.tmpDocumentInfo.type
            this.documentContent[0].content = this.tmpDocumentInfo.content
            this.documentContent[0].documentNumber = this.tmpDocumentInfo.documentNumber

            this.tmpDocumentInfo.executives.map(e => {
              console.log(e)
              this.addExecutive = this.addExecutive.concat({
                departmentCode : e.deptCode,
                executiveCode : e.positionCode,
                departmentText : e.deptName,
                executiveText : e.positionName,
                searchedExecutive : { empName : e.empName, empNumber : e.empNumber }
              })
            })
          })
          this.modal=false
        },
        cancel(){
          this.$swal.fire({
            icon:'info',
            title: '작성하신 내용을 모두 잃게 됩니다.</br>취소하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '제출하기',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.go(-1)
            }
          })
        },
        executiveAddFunc(){

          let isPass = true

          /* 일단 이미 선택한 임원진이 있는가 직급부터 확인 */
          let arrayIndex = 0
          this.addExecutive.map((e) => {
            if(e.searchedExecutive.empNumber === this.selectedExecutive){isPass = false}else {isPass = true}
          })

          //isPass = !this.isChange

          if(!isPass) return
          /*************** 선택한 결과가 나온 데이터에서 뽑아야함 시간나면 개선 *************/
          /* 없으면 추가 */
          /* 임직원 순서는 찾았으니까 부서명을 표시하기 위한 함수 */
          console.log(this.searchedExecutive)
          if(this.searchedExecutive[0].empName === '') return
            this.executiveOptions.map((executiveElement) => {
              if(executiveElement.value === this.executive) {
                this.deptOptions.map(departmentElement => {
                  if(departmentElement.value === this.department){
                    if(arrayIndex > 0){
                      this.addExecutive.splice(arrayIndex+1, 0, {
                        departmentText : departmentElement.text,
                        executiveText : executiveElement.text
                      })
                    } else {
                      let selectedExecutive = []
                      this.executivesList.map(e => {
                        if(e.empNumber === this.selectedExecutive){ selectedExecutive = e }
                      })
                      this.addExecutive = this.addExecutive.concat({
                        departmentText : departmentElement.text,
                        executiveText : executiveElement.text,
                        searchedExecutive : { empNumber : selectedExecutive.empNumber, empName : selectedExecutive.empName }
                      })
                    }
                  }
                })
              }
            })
          //this.isChange = true
          console.log(this.addExecutive)
        },
        createDocumentNumber(param){

          const date = new Date()
          const year = date.getFullYear()
          const month = date.getMonth()+1
          const day = date.getDate()

          if(param === 'documentNumber'){
            const documentNumber = `${year}${('00'+month).slice(-2)}${('00'+day).slice(-2)}`
            return documentNumber
          }else if(param === 'date'){
            const hour = date.getHours()
            const minute = date.getMinutes()
            const seconds = date.getSeconds()

            const time = `${year}-${('00'+month).slice(-2)}-${('00'+day).slice(-2)}T${('00'+hour).slice(-2)}:${('00'+minute).slice(-2)}:${('00'+seconds).slice(-2)}`
            return time
          }
        },
        dateConverter(date){
          return date.replace('T', ' ')
        },
        searchExecutive(){

          this.searchedExecutiveOption = []

          /* 선택한 부서에 해당하는 직원 목록 */
          let executives = []
          executives = this.executivesList.filter(e => {
            if(e.deptCode === this.department) { return e }

          })
          /* 조회된 목록에서 해당하는 직책인 직원 찾기 */
          let selectedExecutive = []
          selectedExecutive = executives.filter(e => {
            if(e.positionCode === this.executive) { return e }
          })

          /* 예외처리 */
          if(selectedExecutive[0] === undefined){
            this.$swal.fire({
              icon: 'error',
              title: '조회된 임직원이 없습니다.',
              text: '조건을 변경해서 검색해 주십시오',
              confirmButtonText: '돌아가기',
              footer: '<a href="">문제가 있다면 직원 호출하기</a>'
            })
            this.searchedExecutive = ''
          }else{
            //this.isChange = false
            this.searchedExecutive = selectedExecutive.concat()
            this.searchedExecutiveOption = this.searchedExecutiveOption.concat(selectedExecutive.map(e => {
                return { value : e.empNumber, text : e.empName }
              })
            )
          }

        }
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
  .fade-enter{
    opacity:0.5
  }
  .fade-enter-active,
  .fade-leave-active{
    transition:opacity 0.3s ease-out;
  }
  .fade-leave-to{
    opacity: 0;
  }
</style>