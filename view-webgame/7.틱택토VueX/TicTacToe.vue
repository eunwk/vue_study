<template>
  <div>
    <!-- table-component v-bind:table-data="TableData"/ -->
    <table-component />
    <div>{{ turn }} 님의 턴입니다.!</div>
    {{ tableData }}
    <div v-if="winner">{{ winner }} 가 이겼습니다.</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from "./store";
import TableComponent from "./TableComponent";

export default {
  store,
  components: {
    "table-component": TableComponent, // 컴포넌트 등록
  },
  computed: {
    ...mapState(['tableData', 'winner', 'turn']),
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // winner() {
    //   return this.$store.state.winner;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // }
  },
  methods: {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped></style>

<!-- 정리할 것 

1. vueX
- npm install vuex
- store.js 생성

2. computed 의 함수를 통해 store의 값을 가져 온다.

3. mapState
 store의 값을 받아오기 위해 매번 compute에 각각의 속성을 가져오는 불편함을 개선해 준다.

 import { mapState } from 'vuex';

// computed에 필요하 속성 추가
computed: {
    ...mapState(['tableData', 'winner', 'turn']),
},    



...mapState({
      tableData: state => state.tableData,
      turn: state => state.turn,
      cellData(state) {
        return state.tableData[this.rowIndex][this.cellIndex]
      }
}),


 -->
