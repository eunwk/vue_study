<template>
  <div>
    <!-- div id="computer" :style="{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}" -->
    <div id="computer" :style="computedStyleObject">
      가위바이보
    </div>
    <div>
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }} 점</div>
  </div>
</template>

<script>
let interval = null;
const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

export default {
  data() {
    return {
      imgCoord: rspCoords.바위,
      result: "",
      score: 0,
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
      };
    },
  },
  methods: {
    changeHand() {
      if (this.imgCoord === rspCoords.바위) {
        this.imgCoord = rspCoords.가위;
      } else if (this.imgCoord === rspCoords.가위) {
        this.imgCoord = rspCoords.보;
      } else if (this.imgCoord === rspCoords.보) {
        this.imgCoord = rspCoords.바위;
      }
    },
    onClickButton(choice) {
      clearInterval(interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        this.result = "비겼습니다";
      } else if ([-1, 2].includes(diff)) {
        this.result = "이겼습니다";
        this.score += 1;
      } else {
        this.result = "졌습니다.";
        this.score -= 1;
      }
      setTimeout(() => {
        interval = setInterval(() => {
          this.changeHand();
        }, 100);
      }, 1000);
    },
  },
  beforeCreate() {
    // 화면에 나타나가 전
    console.log("beforeCreate");
  },
  created() {
    // 화면에 나타날때. 데이터 모두 로드
    console.log("created");
  },
  beforeMount() {
    // 화면에 마운드 되기전, 로드된 데이터를 화면에 출력
    console.log("beforeMount");
  },
  mounted() {
    // 화면에 나타난후
    // created 보다는 보통 mounted 에서  작업.
    console.log("mounted");
    interval = setInterval(() => {
      this.changeHand();
    }, 100);
  },
  updated() {
    // 데이터가 바뀌어 컴포넌트가 다시 렌더링 될 때.
    console.log("updated");
  },
  beforeDestroy() {
    // 컴포넌트가 사라지기전
    console.log("beforeDestroy");
    clearInterval(interval);
  },
  destroyed() {
    // 컴포넌트가 사라질 때
    console.log("destroyed");
  },
};
</script>

<style scoped>
#computer {
  width: 150px;
  height: 220px;
}
</style>

<!-- 정리할 것 

1. v-bind:class="state" 와 v-bind:style="{}"

- :class, :style 은 내부에 객체형식을를 쓸 수 있음
:class="{stste: true, hellow: false}"
:style="{backgroundImage: '' , fontSize: '15px'}"


2.계산된 스타일은 캐싱을 위해 computed로 옮길 수 있다.
<div id="computer" :style="{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}">
<div id="computer" :style="computedStyleObject">

computed: {
    computedStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
      }
    }
},

3. 라이프사이클
자주 사용하는 것 : created, mounted , updated, destroyed

beforeCreate() {
    // 화면에 나타나가 전
  },
created() {
    // 화면에 나타날때. 데이터 모두 로드
  },
beforeMount() {
  // 화면에 마운드 되기전, 로드된 데이터를 화면에 출력
},
mounted() {
  // 화면에 나타난후
  // created 보다는 보통 mounted 에서  작업.
},
updated() {
  // 데이터가 바뀌어 컴포넌트가 다시 렌더링 될 때.
},
beforeDestroy() {
    // 컴포넌트가 사라지기전
    console.log("beforeDestroy");
    clearInterval(interval);
  },
destroyed() {
  // 컴포넌트가 사라질 때
}
 -->

