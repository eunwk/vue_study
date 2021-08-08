<template>
  <td @click="onClickTd">
    {{ cellData }}
  </td>
</template>
<script>
import Vue from "vue";
import { mapState } from 'vuex';
import {
  CLICK_CELL,
  SET_WINNER,
  RESET_GAME,
  CHANGE_TURN,
  NO_WINNER,
} from "./store";

export default {
  props: {
    // cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },
  computed: {
    // ...mapState(['tableData', 'winner', 'turn']),
    ...mapState({
      tableData: state => state.tableData,
      turn: state => state.turn,
      cellData(state) {
        return state.tableData[this.rowIndex][this.cellIndex]
      }
    }),

    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // cellData() {
    //   return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    // },  
    // turn() {
    //   return this.$store.state.turn;
    // },
  },
  methods: {
    onClickTd() {
      if (this.cellData) return; // 이미 눌러져 있는 칸 건너뛰기

      // 뮤테이션을 부를때는 commit
      // this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
      this.$store.commit(CLICK_CELL, {
        row: this.rowIndex,
        cell: this.cellIndex,
      });

      // 게임 승패 체크
      let win = false;
      // 가로 검증
      if (
        this.tableData[this.rowIndex][0] === this.turn &&
        this.tableData[this.rowIndex][1] === this.turn &&
        this.tableData[this.rowIndex][2] === this.turn
      ) {
        win = true;
      }
      // 세로 검증
      if (
        this.tableData[0][this.cellIndex] === this.turn &&
        this.tableData[1][this.cellIndex] === this.turn &&
        this.tableData[2][this.cellIndex] === this.turn
      ) {
        win = true;
      }
      // 대각선 검증
      if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        win = true;
      }
      if (win) {
        // this.winner = this.turn;
        this.$store.commit(SET_WINNER, this.turn);
        // this.turn = 'O';
        // this.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
        this.$store.commit(RESET_GAME);
      } else {
        // 무승부
        let all = true;
        this.tableData.forEach((row) => {
          // 무승부 검사
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          });
        });
        if (all) {
          //무승부
          // rootData.winner = '';
          this.$store.commit(NO_WINNER);
          // rootData.turn = 'O';
          // rootData.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
          this.$store.commit(RESET_GAME);
        } else {
          // 이기거나 무승부가 아니라면 다음턴
          // rootData.turn = rootData.turn === 'O' ? 'X' : 'O'; // 최상위 부모의 state에 접근
          this.$store.commit(CHANGE_TURN);
        }
      }

      // this.$parent.$data.parent = '나는 엄마였어';  // 부모중 특정 state에 접근
    },
  },
};
</script>

<style scoped>
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>

<!-- 정리할 것 

1. 
    
 -->
