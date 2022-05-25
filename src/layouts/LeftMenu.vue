<template>
<!--    <input type="checkbox" id="menu-toggle" style="display:block; border: 1px solid black"/>
    <label for="menu-toggle" class="menu-icon"><i class="fa fa-bars"></i></label>
    <div >
        Main Content Here
    </div>-->
    <div class="slideout-sidebar">
        <ul>
            <li><router-link class="menuRouter" to="/MainPage">홈으로 가기</router-link></li>
            <li><router-link class="menuRouter" to="/RequestApproval">결재 신청</router-link></li>
            <li><router-link class="menuRouter" to="/DocumentList">결재 상태</router-link></li>
            <li v-if="executiveCheck"><router-link class="menuRouter" to="/DocumentApprovalList">결재 승인</router-link></li>
            <li v-if="executiveCheck"><router-link class="menuRouter" to="/EmpManager">회원 관리</router-link></li>
        </ul>
        <div id='slideLable' class="slideLable" @mouseover="openNav">Menu</div>
    </div>



</template>
<script>
    import {mapState} from "vuex";

    export default {
      created() {
        this.positionCheckFunc()
      },
      computed:{
        ...mapState({ empData : state => state.hr.emp.empData })
      },
      methods:{
        openNav() {
            const menu = document.querySelector(".slideout-sidebar")

            if (this.isOpen === false) {
                this.isOpen=true
                menu.style.left = "0px";
            } else {
                this.isOpen=false
                menu.style.left = "-150px";
            }
        },
        positionCheckFunc() {
          console.log('positionCheckFunc')
          const positionCode = this.empData.positionCode
          console.log(positionCode)
          const positionNumber = positionCode.substring(2, 4)
          console.log(positionNumber)
          if(positionNumber > 3){
            this.executiveCheck = true
          } else {
            this.executiveCheck = false
          }
        }
      },
      data() {
          return {
            isOpen: false,
            executiveCheck: false
          }
      }
    }
</script>
<style>
    @import '../assets/scss/SideMenu.scss';

</style>