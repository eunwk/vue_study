<template>
  <div>
    <div>당첨숫자</div>
    <div id="결과창">
      <lotto-ball
        v-for="ball in winBalls"
        :key="ball"
        v-bind:number="ball"
      ></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한번더</button>
  </div>
</template>

<script>
import LottoBall from "./LottoBall";

const getWinNumbers = () => {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
};

let timeouts = [];
export default {
  components: {
    "lotto-ball": LottoBall, // 컴포넌트 등록
    // LottoBall,  뷰는 파스칼 케이스를 케밥케이스로 바꿔주므로 위와 같이 줄여쓸 수 있다.
  },
  data() {
    return {
      winNumbers: getWinNumbers(), // 6개 숫자
      winBalls: [],
      bonus: null,
      redo: false,
    };
  },
  computed: {},
  methods: {
    onClickRedo() {
      // 기존값 제거
      this.winNumbers = getWinNumbers(); // 6개 숫자
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;

      //새로 시작
      this.showBalls();
    },
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    },
  },
  mounted() {
    this.showBalls();
  },
  beforeDestroy() {
    timeouts.forEach((t) => {
      clearTimeout(t);
    });
  },
  watch: {
    // 되도록 쓰지 않는다.
    // state 값이 바뀔때 작동 시킬 수 있음.
    // 변수명(value, oldValue) {
    //   someting do...
    // }
    // bonus(value, oldValue) {
    //   if(value.length === null) {
    //     this.showBalls();
    //   }
    // }
  },
};
</script>

<style scoped></style>

<!-- 정리할 것 

1. watch: {},
2. components

3. number="10" 
    <lotto-ball v-for="ball in winBalls" :key="ball" number="10"></lotto-ball>
    <lotto-ball v-for="ball in winBalls" :key="ball" v-bind:number="ball"></lotto-ball>
    <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>  축약형(v-bind 생략)

    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    
       props 속성명에 를 v-bind를 붙이면 state 또는 변수의 값을 전달할 수 있다.

 -->
