<template>
    <header>
      <h2 style="float: left; margin-left:20px" @click="logOut">로그아웃</h2>
        <div class="userState">
          <p>이름:{{empData.empName}} </p>
          <p>직급:{{empData.positionName}}</p>
        </div>
    </header>
</template>
<script>
    import { mapState } from 'vuex';

    export default {
        computed :{
            ...mapState({ empData : state => state.hr.emp.empData})
        },
        methods : {
          logOut(){
            this.$store.dispatch('hr/emp/logOut')
          }
        }
    }
</script>
<style>
    @import "~@/assets/scss/BaseLayout.scss";
</style>