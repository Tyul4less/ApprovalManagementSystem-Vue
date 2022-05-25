<template>

  <div style="width: 600px; height: 300px; margin: auto; border: 5px solid gold; margin-top: 250px; font-size: 30px; padding: 30px 30px 0 30px">
    <div style="float:left; width: 100px; height: 50px; text-align: center; margin-right: 40px">
      <p >ID</p>
    </div>
    <div>
      <input type="text" placeholder="아이디를 입력해주세요" style="width:390px" v-model="loginData.empId" @keyup.enter="login"/>
    </div>
    <div style="margin-top: 30px; float:left; width: 100px; height: 50px;text-align: center;  margin-right: 40px">
      <p >PW</p>
    </div>
    <div>
      <input type="password" placeholder="비밀번호를 입력해주세요" style="width:390px; margin-top: 30px;" v-model="loginData.empPw" @keyup.enter="login"/>
    </div>
    <div style="width: auto; margin-top: 30px; height: 100px; text-align: center">
      <b-button variant="success" style="height: 50px; width: 100px; font-size: 20px;" @click="login">로그인</b-button>
      <div style="text-align: center">
        <div style="font-size: 20px; margin-top: 5px;" @click="registModal">회원가입</div>
      </div>
    </div>
  </div>

  <transition name="fade" mode="out-in">
    <CommonModal @close="closeModal" v-if="modal">
      <template v-slot:header>
        <div style="height: 12px; margin-top:-9px">바른 정보를 입력해주시고 가입 버튼을 눌러주시기 바랍니다.</div>
      </template>
      <template v-slot:body>
        <div style="display: flex;">이름  : <b-form-input v-model="registData[0].empName" placeholder="이름" required style="height: 30px; width: 100px; margin-left: 10px"/></div>
        <div style="display: flex;">ID &nbsp;&nbsp; : <b-form-input v-model="registData[0].empId" placeholder="ID" required style="height: 30px; width: 100px; margin-left: 10px"/></div>
        <div style="display: flex;">PW  : <b-form-input v-model="registData[0].empPw" placeholder="PW" required style="height: 30px; width: 100px; margin-left: 10px"/></div>
        <div style="display: flex; margin-top: 10px">부서 :
          <b-form-select style="width:100px; margin-left: 10px" v-model="registData[0].deptCode" :options="deptOptions" size="sm"/>
        </div>
        <div style="display: flex; margin-top: 10px">직급 :
          <b-form-select style="width:100px; margin-left: 10px" v-model="registData[0].positionCode" :options="positionOptions" size="sm"/>
        </div>
      </template>

      <template v-slot:footer>
        <input class="btn btn-primary" type="button" @click="registButton" value="가입"/>
        <input class="btn btn-primary" type="button" @click="closeModal" value="취소"/>
      </template>
    </CommonModal>
  </transition>
</template>
<script>
    import { mapState } from 'vuex';
    import CommonModal from "@/components/modal/CommonModal";
    import router from "@/router";
    export default {
      components: {CommonModal},
      created(){
        if(this.empData.positionCode !== undefined){
          router.push({name : 'MainPage'})
        }
      },
      computed:{
            ...mapState({ empData : state => state.hr.emp.empData}),
      },
      data() {
        return {
          loginData :
              {
                empId : '',
                empPw : ''
              },
          modal: false,
          deptOptions:[
            { value: 'DE01', text: '개발팀' },
            { value: 'DE05', text: '기술지원팀' },
            { value: 'DE04', text: '마케팅팀' },
            { value: 'DE02', text: '웹디자인팀' },
            { value: 'DE03', text: '총무팀' },
          ],
          positionOptions:[
            { value: 'PO01', text: '사원' },
            { value: 'PO02', text: '대리' },
            { value: 'PO03', text: '과장' },
            { value: 'PO04', text: '차장' },
            { value: 'PO05', text: '부장' },
            { value: 'PO06', text: '이사' },
            { value: 'PO07', text: '전무' },
            { value: 'PO08', text: '사장' },
          ],
          registData : [{
            empName: '',
            empId: '',
            empPw: '',
            positionCode: '',
            deptCode: '',
            joinDate: '',
          }]
        }
      },
      methods: {
        login() {
          this.$store.dispatch('hr/emp/login', this.loginData).then(()=>{
            console.log('로그인')
            console.log(this.empData.positionCode)
            if(this.empData.positionCode === undefined){
              this.$swal.fire({
                icon: 'error',
                title: '아이디나 비밀번호를 제대로 확인하셨나요?',
                text: '아이디나 비밀번호를 제대로 확인하세요.',
                confirmButtonText: '돌아가기',
                footer: '<a href="">아이디 혹은 비밀번호 찾기</a>'
              })
            }else{
              router.push({name : 'MainPage'})
            }
          })

        },
        registModal(){
          console.log('호출')
          this.modal = true
        },
        closeModal() {
            this.modal = false
        },
        registButton() {
          console.log(JSON.stringify(this.registData))
          this.registData[0].joinDate = this.createJoinDate()
          this.$store.dispatch('hr/emp/registEmp', this.registData)
          this.modal=false
        },
        createJoinDate(){
          const date = new Date()
          const year = date.getFullYear()
          const month = date.getMonth()+1
          const day = date.getDate()

          const documentNumber = `${year}-${('00'+month).slice(-2)}-${('00'+day).slice(-2)}`
          console.log(documentNumber)
          return documentNumber
        },
      },
    }
</script>
<style>
    @import "~@/assets/scss/BaseLayout.scss";

    body::-webkit-scrollbar { display:none; }
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