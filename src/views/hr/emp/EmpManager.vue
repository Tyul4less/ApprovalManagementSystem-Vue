<template >
  <div style="width:1000px; height: auto; margin: 10% auto;">
    <BCard style="width: 1000px; height: auto;  box-shadow: rgba(0,0,0,0.3) 0px 4px 20px 0px; border-radius: 15px;">
      <div style="width: 500px; height: 500px; border-right: 1px solid rgba(116, 116, 116, 0.5); padding-right: 8px; float: left">

        <div style="height: 20px; text-align: center">
          <div>회원 관리 페이지 입니다.</div>
          <hr style="margin: 0"/>
        </div>

            <div style="border:1px solid black; margin-top: 10px; padding: 5px; height: 470px; overflow-y: auto">
              <div style="height: 40px">
                <b-button variant="primary" style="height: 30px; font-size: 13px; float:right; margin:5px 5px" @click="searchEmpList">조회하기</b-button>

                <div style="display: inline-flex; padding:5px; float: right">
                  <h5 style="margin:2px 4px">부서 : </h5>
                  <b-form-select style="height: 30px; width: 120px; font-size: 12px" :options="deptOptions" v-model="deptCode"/>
                </div>
                <div style="display: inline-flex; padding:5px; float: right">
                  <h5 style="margin:2px 4px">직책 : </h5>
                  <b-form-select style="height: 30px; width: 120px; font-size: 12px" :options="positionOptions" v-model="positionCode"/>
                </div>
              </div>
              <div>
                <div style="text-align: center; display:flex; width: 100%">
                  <div style="border-bottom:2px solid black; width: 70px; height: 25px">사번</div>
                  <div style="border-bottom:2px solid black; width: 100px; height: 25px">이름</div>
                  <div style="border-bottom:2px solid black; width: 150px; height: 25px">회원 ID</div>
                  <div style="border-bottom:2px solid black; width: 150px; height: 25px">부서명</div>
                  <div style="border-bottom:2px solid black; width: 150px; height: 25px">직급</div>
                </div>
                <div v-for="(item, index) in empList" :key="index" style="text-align: center; display:flex; width: 100%">
                  <div style="border-left:1px solid black;border-bottom:1px solid black; border-right:1px solid black; width: 70px; height: 25px" :id="item.empNumber" @click="selectedEmpInfo($event)">{{ item.empNumber }}</div>
                  <div style="border-bottom:1px solid black; border-right:1px solid black; width: 100px; height: 25px" :id="item.empNumber" @click="selectedEmpInfo($event)">{{ item.empName }}</div>
                  <div style="border-bottom:1px solid black; border-right:1px solid black; width: 150px; height: 25px" :id="item.empNumber" @click="selectedEmpInfo($event)">{{ item.empId }}</div>
                  <div style="border-bottom:1px solid black; width: 150px; height: 25px" :id="item.empNumber" @click="selectedEmpInfo($event)">{{ item.deptName }}</div>
                  <div style="border-left:1px solid black; border-bottom:1px solid black; border-right:1px solid black; width: 150px; height: 25px" :id="item.empNumber" @click="selectedEmpInfo($event)">{{ item.positionName }}</div>
                </div>

              </div>
          </div>


      </div>
      <!-- 우측 -->
      <div style="float: right; width: 460px;">

        <h4 style="margin:auto">선택된 사원</h4>
        <div style="border: 1px solid navy; width: 100%; text-align: left; padding:7px; height: 470px">
          <!-- 사번 -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">사번</div>
            </div>
            <b-form-input :value="empInfo[0].empNumber" style="width: 120px; height: 30px; font-size: 13px" disabled/>
          </div>
          <!-- 이름 -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">이름</div>
            </div>
            <b-form-input :value="empInfo[0].empName" style="width: 120px; height: 30px; font-size: 13px" disabled/>
          </div>
          <!-- 회원 ID -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">ID</div>
            </div>
            <b-form-input :value="empInfo[0].empId" style="width: 120px; height: 30px; font-size: 13px" :disabled="disabled"/>
          </div>
          <!-- 회원 PW -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <BIconEyeSlashFill style="position:fixed; width: 20px; height: 30px; font-size: 13px; right:315px" v-show="!showPw && editMode" @click="showPassword"/>
            <BIconEyeFill style="position:fixed; width: 20px; height: 30px; font-size: 13px; right:315px" v-show="showPw && editMode" @click="showPassword"/>
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">PW</div>
            </div>
            <b-form-input v-model="empInfo[0].empPw" :type="password" style="width: 120px; height: 30px; font-size: 13px" :disabled="disabled"/>
          </div>
          <!-- 부서명 -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">부서명</div>
            </div>
            <b-form-select v-model="empInfo[0].deptCode" :options="deptEditOptions" style="width: 120px; height: 30px; font-size: 13px" v-show="editMode"/>
            <b-form-input :value="empInfo[0].deptName" style="width: 120px; height: 30px; font-size: 13px" v-show="!editMode" disabled/>
          </div>
          <!-- 직급 -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">직급</div>
            </div>
            <b-form-select v-model="empInfo[0].positionCode" :options="positionEditOptions" style="width: 120px; height: 30px; font-size: 13px" v-show="editMode"/>
            <b-form-input :value="empInfo[0].positionName" style="width: 120px; height: 30px; font-size: 13px" v-show="!editMode" disabled/>
          </div>
          <!-- 가입날짜 -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">가입날짜</div>
            </div>
            <b-form-input :value="empInfo[0].joinDate" style="width: 120px; height: 30px; font-size: 13px" disabled/>
          </div>
          <!-- 탈퇴날짜 -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">탈퇴날짜</div>
            </div>
            <b-form-input :value="empInfo[0].withdrawDate" style="width: 120px; height: 30px; font-size: 13px" disabled/>
          </div>
          <!-- 회원상태 -->
          <div style="margin: 20px 5px 20px 5px; display: inline-flex;">
            <div style="width: 80px; height: 25px; text-align: right">
              <div style="margin-right: 10px">회원상태</div>
            </div>
            <b-form-input :value="empInfo[0].statusName" style="width: 120px; height: 30px; font-size: 13px" disabled/>
          </div>
          <!-- 수정 완료 버튼 -->
          <div style="margin: 10px 5px 20px 5px; display: inline-flex;" v-show="!disabled">
            <b-button variant="success" style="width: 100px; height: 40px; font-size:16px; margin: 0 0 0 80px" @click="editEmp">수정 완료</b-button>
          </div>
        </div>
      </div>
    </Bcard>
    <div style="margin-top:10px; bottom:0">
      <b-button style="float: right; margin-right: 5px" variant="warning" @click="setEditMode">수정</b-button>
      <b-button style="float: right; margin-right: 5px" variant="danger" @click="withdrawEmp" :disabled="!disabled">탈퇴</b-button>
      <b-button style="float: right; margin-right: 5px" variant="primary" @click="$router.go(-1)">뒤로가기</b-button>
    </div>

  </div>
</template>
<script>
  import { mapState } from "vuex";

  export default {

    components:{
    },
    created() {
      const empSearchOption = { deptCode : this.deptCode, positionCode : this.positionCode }
      this.$store.dispatch('hr/emp/findAllEmp', empSearchOption)
    },
    computed:{
      ...mapState({
        empData : state => state.hr.emp.empData,
        myDocumentInfo : state => state.hr.approval.documentInfo,
        empList : state => state.hr.emp.empList,
      })
    },
    data(){
      return {
        deptOptions:[
          {value:'', text:'전체선택'},
          {value:'DE01', text:'개발팀'},
          {value:'DE02', text:'웹디자인팀'},
          {value:'DE03', text:'총무팀'},
          {value:'DE04', text:'마케팅팀'},
          {value:'DE05', text:'기술지원팀'},
        ],
        deptEditOptions:[
          {value:'DE01', text:'개발팀'},
          {value:'DE02', text:'웹디자인팀'},
          {value:'DE03', text:'총무팀'},
          {value:'DE04', text:'마케팅팀'},
          {value:'DE05', text:'기술지원팀'},
        ],
        positionOptions:[
          {value:'', text:'전체선택'},
          {value:'PO01', text:'사원'},
          {value:'PO02', text:'대리'},
          {value:'PO03', text:'과장'},
          {value:'PO04', text:'차장'},
          {value:'PO05', text:'부장'},
          {value:'PO06', text:'전무'},
          {value:'PO07', text:'이사'},
        ],
        positionEditOptions:[
          {value:'PO01', text:'사원'},
          {value:'PO02', text:'대리'},
          {value:'PO03', text:'과장'},
          {value:'PO04', text:'차장'},
          {value:'PO05', text:'부장'},
          {value:'PO06', text:'전무'},
          {value:'PO07', text:'이사'},
        ],
        fields: [
          { key: 'empNumber', label: '사번' },
          { key: 'empName', label: '이름' },
          { key: 'empId', label: '회원 ID' },
          { key: 'deptName', label: '부서명' },
          { key: 'positionName', label: '직급' },
        ],
        tableColumns: [
          {
            empNumber: 0,
            empName: '',
            empId: '',
            deptName: '',
            positionName: '',
          },
        ],
        deptCode: '',
        positionCode: '',
        selectMode:'single',
        empInfo:[
          {
            empNumber:0,
            empName:'',
            empId:'',
            empPw:'',
            joinPw:'',
            deptCode:'',
            positionCode:'',
            joinDate:'',
            statusName: '',
          }
        ],
        showPw:false,
        password:'password',
        editMode:false,
        disabled:true
      }
    },
    methods:{
      searchEmpList(){
        const empSearchOption = { deptCode : this.deptCode, positionCode : this.positionCode }
        console.log(empSearchOption)
        this.$store.dispatch('hr/emp/findAllEmp',empSearchOption)
      },
      selectedEmpInfo(event){
        this.editMode = false
        this.disabled = true

        const empNumber = parseInt(event.target.id)
        this.empList.filter(e => {
          if(e.empNumber === empNumber){
            this.empInfo[0].empNumber = e.empNumber
            this.empInfo[0].empName = e.empName
            this.empInfo[0].empId = e.empId
            this.empInfo[0].deptName = e.deptName
            this.empInfo[0].positionName = e.positionName
            this.empInfo[0].joinDate = e.joinDate
            this.empInfo[0].statusName = e.statusName
            this.empInfo[0].withdrawDate = e.withdrawDate
          }
        })
      },
      withdrawEmp(){
        const date = this.createNowDate()
        this.$swal.fire({
          icon:'question',
          title: '회원을 탈퇴시킵니다.',
          text: '탈퇴 시키겠습니까?',
          showCancelButton: true,
          confirmButtonText: '수정하기',
          cancelButtonText: '취소',
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('hr/emp/withdrawEmp', { empNumber : this.empInfo[0].empNumber, withdrawDate : date, status : 'ST03' }).then(() => this.resetFunc())
            this.$swal.fire({
              icon:'success',
              title: '완료!',
              confirmButtonText: '닫기',
            })
          }
        })
      },
      createNowDate(){
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()

        return `${year}-${('00'+month).slice(-2)}-${('00'+day).slice(-2)}`
      },
      showPassword(){
        if(this.showPw){
          this.password = 'password'
          this.showPw = false
        }else{
          this.password = 'text'
          this.showPw = true
        }
      },
      setEditMode(){
        this.$swal.fire({
          title: '사용자 인증을 합니다.',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: '입력',
          showLoaderOnConfirm: true,
          preConfirm: (empPw) => {
            return this.$store.dispatch('hr/emp/userCertified', { empId : this.empInfo[0].empId, empPw : empPw }).then(e => {
              if(e === 'fail'){
                throw new Error(e)
              }
            }).catch(error => {
              this.$swal.showValidationMessage(
                  `Request failed: ${error}`
              )
            })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire('Saved!', '', 'success')
            console.log('editMode : '+this.editMode)
            if(this.editMode){
              this.editMode = false
              this.disabled = true
            }else{
              this.editMode = true
              this.disabled = false
            }
          }
        })
      },
      editEmp(){
        this.$swal.fire({
          icon:'question',
          title: '회원 정보를 수정하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '수정하기',
          cancelButtonText: '취소',
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch('hr/emp/editEmpInfo', this.empInfo)
            this.$swal.fire({
              icon:'success',
              title: '완료!',
              confirmButtonText: '닫기',
            }).then((result) => {
              if (result.isConfirmed) {
                this.resetFunc()
              }
            })
          }
        })
      },
      resetFunc(){
        const empSearchOption = { deptCode : this.deptCode, positionCode : this.positionCode }
        this.$store.dispatch('hr/emp/findAllEmp', empSearchOption)


        this.empInfo = [
          {
            empNumber:0,
            empName:'',
            empId:'',
            empPw:'',
            joinPw:'',
            deptCode:'',
            positionCode:'',
            joinDate:'',
          }
        ]
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