<template>
  <table>  
    <tr-component v-for="(rowData, index) in tableData" :row-data="rowData" :row-index="index" :key="index"></tr-component>
  </table>
</template>
<script>
import TrComponent from './TrComponent';
export default {
  components: {
    "tr-component": TrComponent, // 컴포넌트 등록
  },
  props: {
    tableData: Array,
  },

  methods: {},
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-left: 1px solid black;
}


</style>

<!-- 정리할 것 

1. 
<tr-component v-for="(rowData, index) in tableData" :row-data="rowData" :row-index="index" ></tr-component>
v-for="(rowData, index) in tableData" // 데이터가 2차원 배열이므로 index도 같이 넘겨 주어야 한다.

 -->
