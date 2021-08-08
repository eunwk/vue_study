<template>
  <table>
    <tr-component
      v-for="(rowData, index) in tableData"
      :row-index="index"
      :key="index"
    ></tr-component>
  </table>
</template>
<script>
import TrComponent from "./TrComponent";
export default {
  components: {
    "tr-component": TrComponent, // 컴포넌트 등록
  },
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
    turnMessage() {
      return this.$store.getters.turnMessage;
    }
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



2. slot. 리액트의 children 과 같음.


<slot />

<slot>
슬롯사이에 디폴트 값을 넣을 수 있음. 넘어오는것이 없을 경우 기본값이 렌더링 됨.
</slot>
 -->
