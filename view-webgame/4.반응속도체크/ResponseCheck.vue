<template>
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">
      {{ message }}
    </div>
    <template>
      <div v-show="result.length">걸린시간 {{ result }}ms</div>
      <div>
        평균시간
        <!-- {{ result.reduce((a, c) => a + c, 0) / result.length || 0 }} -->
        {{ average }}ms
      </div>
    </template>
    <button v-on:click="onReset">리셋</button>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요",
    };
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    },
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "초록색이 되면 클릭하세요";
        timeout = setTimeout(() => {
          this.state = "now";
          this.message = "지금 클릭!";
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
      } else if (this.state === "ready") {
        clearTimeout(timeout);
        this.state = "waiting";
        this.message = "성급하시군요! 초록색이 된 후에 클릭하세요!";
      } else if (this.state === "now") {
        endTime = new Date();
        this.state = "waiting";
        this.message = "클릭해서 시작하세요.";
        this.result.push(endTime - startTime);
      }
    },
  },
};
</script>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#screen.waiting {
  background-color: aqua;
}

#screen.ready {
  background-color: red;
  color: #fff;
}

#screen.now {
  background-color: greenyellow;
}
</style>

<!-- 정리할 것 

1. 자동으로 빌드 되도록  package.json 수정
 "scripts": {
    "build": "webpack --watch"
  },

2. v-bind:class="data키값"
<div id="screen" v-bind:class="state">{{ message }}</div>
<div id="screen" :class="state">{{ message }}</div> /*축약형*/
v-on:click  축약형 @click


3. npm install vue-style-loader -D   뷰 스타일 로더 설치
   npm install css-loader -D   CSS 로더 설치
webpack.config.js 모듈의 rule 추가
모듈은 javascript 가 아닌 확장자의 파일들을 로드해서 javascript로 변환해 주는 역할 을 한다.

rules: [{
        test: /\.vue$/,
        use: 'vue-loader',
}, {
    test: /\.css$/,
    use: [
        'vue-style-loader',
        'css-loader',
    ],
}],


4. <style scoped>
style이 해당 컴포넌트에서만 유효 하도록 scope를 생성한다.


5.  dev-server와  hot loading

npm install webpack-dev-server -D 
package.json 에 dev 추가
"scripts": {
    "build": "webpack --watch",
    "dev": "webpack serve --env development --hot"
},

dist 폴더가 기존에 있었다면 삭제.
dev 서버를 실행했을때 생기는 dist 폴더(회색)는
실제 생성되는 폴더(파일)이 아니다. 램상에만 존재한다.


webpack.config 수정 (publicPath 추가)
 output: {
        filename : 'app.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dest', // dev-server 사용할 때 추가
       // filename : '[name].js' 위 app.js 라고 쓴것과 동일함.
},


6. 기본값 연산자
{{ result > 0 ? result.reduce((a, c) => a + c, 0) / result.length : 0 }}
{{ result.reduce((a, c) => a + c, 0) / result.length || 0 }}


7. computed
계산식은 template 쪽에 넣지 말고 computed 속성을 사용한다.
computed 에 계산식을 쓰면 값이 캐싱이 된다. template에 쓰면 화면 렌더링시 계산식도 다시 실행 되므로
computed에 쓰면 성능개선에 도움이 된다.

8. v-show
<div v-show="result.length">걸린시간 {{ result }}</div>
<div v-if="result.length">걸린시간 {{ result }}</div>

9. v-show와 v-if 차이점
v-show 로 조건문을 걸 경우, 엘리먼트가 랜더링은 되나, style display:none 처리되고,
v-if로 조건문을 걸 경우, 엘리먼트 자체가 렌더링 되지 않는다.

10. template
div 대신 <template> 태그를 이용해 엘리먼트들을 묶을 수 있음.  react의 Fragment 같은 것.
단, 컴포넌트의 최상위 div는 <template>으로 대체 할 수 없음.

 -->
