<template>  
    <div>
      <!-- table-component v-bind:table-data="TableData"/ -->
      <table-component :table-data="tableData"/>
      <div>{{ turn }} 님의 턴입니다.!</div>
      {{tableData}}
      <div v-if="winner">{{winner}} 가 이겼습니다.</div>
    </div>
</template>

<script>
import TableComponent from './TableComponent';
import EventBus from './EventBus';

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
      turn: 'O',
      winner: '',
    };
  },
  computed: {},
  methods: {
    // td의 onClickTd 내용을 가져온다.
    onClickTd(rowIndex, cellIndex) {
      console.log("루트에서 발생");

      // console.log(this.$root.$data);
      // console.log(this.$parent.$data);
      // this.$root.$data.tableData[rowIndex][cellIndex] = this.$root.$data.turn;
      this.$set(this.tableData[rowIndex], cellIndex, this.turn);

      // 게임 승패 체크
      let win = false;
      // 가로 검증
      if(this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
        win = true;
      } 
      // 세로 검증
      if(this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
        win = true;
      } 
      // 대각선 검증
      if(this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
        win = true;
      }
      if(this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
        win = true;
      }
      if(win) {
        this.winner = this.turn;
        this.turn = 'O';
        this.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
      } else {
        // 무승부
        let all = true;
        this.tableData.forEach((row) => { // 무승부 검사
          row.forEach((cell) => {
            if(!cell) {
              all = false;
            }          
          })
        });
        if(all) {
          //무승부
          this.winner = '';
          this.turn = 'O';
          this.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
        } else {
          // 이기거나 무승부가 아니라면 다음턴
            this.turn = this.turn === 'O' ? 'X' : 'O'; // 최상위 부모의 state에 접근
        }
        
      }

      
    }
  },
  mounted() {},
  beforeDestroy() {},
  created() {
    EventBus.$on('clickTd', this.onClickTd);
  },
};
</script>

<style scoped></style>

<!-- 정리할 것 

1. :table-data="tableData"
2. EventBus 이벤트 한곳에서 관리
 -->
