<template>
  <div>
    <h1>{{ result }} : {{ answer }}</h1>
    <form v-on:submit.prevent="onSubmitForm">
      <input ref="answer" max="9999" min="1111" type="number" v-model="value" />
      <button type="submit">입1력</button>
    </form>
    <div>시도: {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries" v-bind:key="t.try">{{ t.try }} {{ t.result }}</li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

export default {
  data() {
    // console.log();
    return {
      answer: getNumbers(),
      tries: [],
      result: "",
      value: "",
    };
  },
  methods: {
    onSubmitForm(e) {
      // e.preventDefault();
      if (this.value === this.answer.join("")) {
        // 정답이면
        this.tries.push({
          try: this.value,
          result: "홈런",
        });
        this.result = "홈런";
        alert("게임을 다시 시작합니다.");
        this.value = "";
        this.tries = [];
        this.answer = getNumbers();
      } else {
        // 오답이면
        if (this.tries.length >= 9) {
          this.result = `10번 모두 틀렸습니다. 답은 ${this.answer.join(
            ""
          )}입니다.`;
          alert("게임을 다시 시작합니다.");
          alert("게임을 다시 시작합니다.");
          this.value = "";
          this.tries = [];
          this.answer = getNumbers();
        }
        let strike = 0;
        let ball = 0;
        console.log("this.value", this.value); // "1234"
        const answerArray = this.value.split("").map((v) => parseInt(v));
        // "1234".split("") 은 ["1", "2", "3", "4"]
        console.log("answerArray", answerArray); // [1, 2, 3, 4]
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === this.answer[i]) {
            // 숫자, 자릿수 모두 정답
            strike++;
          } else if (this.answer.includes(answerArray[i])) {
            // 숫자만 정답
            ball++;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike} 스트라이크, ${ball} 볼입니다.`,
        });
        this.value = "";
      }
      this.$refs.answer.focus();
    },
  },
};
</script>

<style></style>

<!-- 정리할 것 

1. vue 파일의 구조
  <template></template>
  <script></script>
  <style></style>

2. 반복문 v-for 와 in 순환, :key
 <li v-for="t in tries" v-bind:key="t.try">{{ t.try }} {{ t.result }}</li>
<li v-for="t in tries" :key="t.try">{{ t.try }} {{ t.result }}</li>  축약형

3. v-on:submit="이벤트"
  - v-on: 을 @로 대체 가능
  <form @submit="onSubmitForm">
  - 폼 이벤트의 e.preventDefault를 옵션으로 넣을 수 있음.
  <form @submit.prevent="onSubmitForm">
  <form v-on:submit.prevent="onSubmitForm">
 -->
