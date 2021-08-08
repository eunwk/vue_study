<template>
  <td @click="onClickTd">
    {{ cellData }}
  </td>
</template>
<script>
import Vue from 'vue';
import EventBus from './EventBus';

export default {
  
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },

  methods: {
    onClickTd() {
      if(this.cellData) return; // 이미 눌러져 있는 칸 건너뛰기
        console.log("td에서 발생");
        EventBus.$emit('clickTd', this.rowIndex, this.cellIndex); // 최상위 이벤트의 클릭 이벤트가 실행됨. 호출하며 사용될 속성값도 같이 넘김.
      /* 이벤트 버스를 사용하기 위해  최상위 컴포넌트로 이벤트 옮겨감
      let rootData = this.$root.$data;

      // console.log(this.$root.$data);
      // console.log(this.$parent.$data);
      // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
      this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

      // 게임 승패 체크
      let win = false;
      // 가로 검증
      if(rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
        win = true;
      } 
      // 세로 검증
      if(rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
        win = true;
      } 
      // 대각선 검증
      if(rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
        win = true;
      }
      if(rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
        win = true;
      }
      if(win) {
        rootData.winner = rootData.turn;
        rootData.turn = 'O';
        rootData.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
      } else {
        // 무승부
        let all = true;
        rootData.tableData.forEach((row) => { // 무승부 검사
          row.forEach((cell) => {
            if(!cell) {
              all = false;
            }          
          })
        });
        if(all) {
          //무승부
          rootData.winner = '';
          rootData.turn = 'O';
          rootData.tableData = [["", "", ""], ["", "", ""], ["", "", ""]];
        } else {
          // 이기거나 무승부가 아니라면 다음턴
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O'; // 최상위 부모의 state에 접근
        }
        
      }

      
      // this.$parent.$data.parent = '나는 엄마였어';  // 부모중 특정 state에 접근
      */
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
    $를 통해 최상위 컴포넌트의 data, 또는 부모들 중 특정 state에 접근할 수 있다.

     this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O'; // 최상위 부모의 state에 접근
    this.$parent.$data.who = '나는 엄마였어';  // 부모중 특정 state에 접근

2. vewx

3. 뷰에서 '배열'의 값을 가진 state는 '인덱스'로 접근해 값을 바꿀 경우, 화면에 반영이 되지 않는다. (객체의 kdy로 값을 경우도 동작하지 않음)
    this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn; //반영되지 않음.
    this.tableData[1][2] = 'O'  //반영되지 않음.
    this.tableData.push("O")

    this.$set(this.$root.$data.tableData[this.rowIndex], this.cellIndex, this.$root.$data.turn); // 반영됨.

해결방법1. 
Vue.set(바꿀 state, 키, 값)

import Vue from 'vue'; (뷰 호출)
Vue.set(this.tableData[1][0], 'O'); // 나쁨
Vue.set(this.tableData[1], 0, 'O');  // 좋음 this.tableData[1][0] 이렇게 쓴것과 같음.

해결방법2 (Vue를 호출하지 않아도 됨.)
this.$set(this.tableData[1], 0, 'O');

4. 이벤트 버스
디벤트 버스를 사용하면 컴포넌트와 관련된 모든 이벤트를 루트 컴포넌트에서 관리할 수 있다.
 -->
