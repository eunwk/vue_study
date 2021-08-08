<template>
  <tr>
    <td-component
      v-for="(cellData, index) in rowData"
      :key="index"
      :row-index="rowIndex"
      :cell-index="index"
    ></td-component>
  </tr>
</template>
<script>
import TdComponent from "./TdComponent";
export default {
  components: {
    "td-component": TdComponent, // 컴포넌트 등록
  },

  data() {
    return {
      who: "내가 아빠야",
    };
  },
  props: {
    rowIndex: Number,
  },
  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex];
    },
  },

  methods: {},
};
</script>

<style scoped></style>

<!-- 정리할 것 



 -->
