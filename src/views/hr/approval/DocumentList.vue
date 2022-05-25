<template >
  <div style="width:500px; height: auto; margin: 10% auto">
    <BCard style="width: 650px; height: 500px;  box-shadow: rgba(0,0,0,0.3) 0px 4px 20px 0px; border-radius: 15px; text-align: center; overflow-y: auto">
      <h2>신청한 문서 조회[{{ empData.empName }}]</h2>
      <div>
        <div style="display: flex; font-weight:bold">
          <div style="border: 1px solid black; width: 50px">순서</div>
          <div style="border: 1px solid black; width: 80px">성명</div>
          <div style="border: 1px solid black; width: 120px">문서 번호</div>
          <div style="border: 1px solid black; width: 300px">제목</div>
          <div style="border: 1px solid black; width: 80px">상태</div>
        </div>

        <div style="display: flex" v-for="( item, index ) in applicationDocumentList" :key="index">
          <div style="border: 1px solid black; width: 50px">{{ index+1 }}</div>
          <div style="border: 1px solid black; width: 80px">{{ item.empName }}</div>
          <div style="border: 1px solid black; width: 120px">{{ item.documentNumber }}</div>
          <div style="border: 1px solid black; width: 300px" class="title" @click="openDocument($event)" :id="item.documentNumber">{{ item.title }}</div>
          <div style="border: 1px solid black; width: 80px">{{ item.status }}</div>
        </div>
      </div>
    </Bcard>
  </div>
</template>
<script>
  import { mapState } from "vuex";

  export default {
    computed:{
      ...mapState({
        empData : state => state.hr.emp.empData,
        applicationDocumentList : state => state.hr.approval.applicationDocumentList
      })
    },
    created() {
      this.$store.dispatch('hr/approval/getApplicationDocumentList', this.empData.empNumber)
    },
    mounted() {
    },
    data(){

    },
    methods:{
      openDocument(e){
        this.$store.dispatch('hr/approval/getDocumentInfo', { documentNumber : e.target.id } ).then(() => {
          this.$router.push({ name : 'MyDocumentInfo' })
        })

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
</style>