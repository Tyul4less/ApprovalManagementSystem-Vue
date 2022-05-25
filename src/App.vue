<template >
  <!--<div v-if='userData.token' >-->
  <div>
    <div v-if="empData.empNumber !== undefined">
      <HeadLine/>
      <LeftMenu/>
    </div>
    <router-view/>
  </div>

<!--  <div>
    <router-view/>
  </div>-->
  <!--<input type="button" value="ff" @click='handler'/>-->
</template>
<script>
    import { mapState } from 'vuex';
    import HeadLine from './layouts/HeadLine'
    import LeftMenu from './layouts/LeftMenu'

    export default {
      name: 'App',
      created(){
        const url = window.location.href
        const sub = url.substring(21)
        if(sub !== '/LoginPage' || sub !== '/'){
          const empData = JSON.parse(window.sessionStorage.getItem('empData'))
          this.$store.commit('hr/emp/SET_EMP_DATA', empData)
        }
      },
      computed:{
        ...mapState({empData: state => state.hr.emp.empData})
      },
      components: {
        HeadLine, LeftMenu
      },
      methods : {
        showMe () {
          console.log(this.empData.empNumber);
        }
      }
    }
</script>