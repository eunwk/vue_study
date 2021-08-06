<template>
    <!-- table-component v-bind:table-data="TableData"/ -->
    <table-component :table-data="tableData"/>
</template>

<script>
import TableComponent from './TableComponent';
export default {
  components: {
    "table-component": TableComponent, // 컴포넌트 등록
  },
  data() {
    return {
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped></style>

<!-- 정리할 것 

1. :table-data="tableData"

 -->
