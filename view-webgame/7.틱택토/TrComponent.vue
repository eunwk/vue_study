<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :row-index="rowIndex" :cell-data="cellData" :cell-index="index" ></td-component>
  </tr>
</template>
<script>
import TdComponent from './TdComponent';
export default {
  components: {
    "td-component": TdComponent, // 컴포넌트 등록
  },
   props: {
    rowData: Array,
    rowIndex: Number,
  },

  methods: {},
};
</script>

<style scoped></style>

<!-- 정리할 것 



 -->
