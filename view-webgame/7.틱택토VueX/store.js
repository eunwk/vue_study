import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 뮤테이션의 함수를 변수로 뺀다 ES5 문법. 오브젝트 다이나믹 프로퍼티(동적속성)
// 뷰에서는 뮤터를 변수에 넣어둘 경우, 변수명 오타가 났을 때 브라우저에서 에러를 표시해 준다. 문자열로 두고 사용할 떄는 오타가 있을 경우 에러를 찾기 힘들다.
// export를 붙여 모듈로 뺀다. 다른곳에서 사용할 수 있도록...
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const RESET_GAME = 'RESET_GAME';
export const CHANGE_TURN = 'CHANGE_TURN';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
    state: {
        // vue의 data와 비슷
        tableData: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ],
        turn: 'O',
        winner: '',
        
    },
    getters: {
        // vue의 computed와 비슷. 기존이 state를 기준으로 추가적인 작업이 필요할 때. 캐싱됨,
        turnMessage(state) {
            return state.turn + '님이 승리하셨습니다.';
        }
    },
    mutations: {
        // state을 변경할 때 사용함.  동기적으로
        // 함수명을 대문자로 짓는다.
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) {   // { row, cell } data 를 구조분해서 받아옴
            // state.tableData[row][cell] = state.turn;
            Vue.set(state.tableData[row], cell, state.turn);   //vueX는 this.$set을 쓰지 않음.
        },
        [CHANGE_TURN](state) {  
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ];  
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    },
    
    actions: {
        // 비동기 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때 

    },
})





/* 정리할 것 
gettters의 값을 다른 컴포넌트에서 가져다 쓸때.

 computed: {

    turnMessage() {
      return this.$store.getters.turnMessage;
    }
  },



  getters 가 여러개일때 mapState 처럼
  mapGetters 가 있다.

*/