<template>
  <div class="ball" :style="computedStyleObject">{{ number }}</div>
</template>
number
<script>
export default {
  name: "LottoBall",
  // props: ['number'],  이렇게 쓸수도 있지만 아래 방식이 권장된다. // 자료형. Number, String, Boolean, Array
  props: {
    number: Number,
  },
  computed: {
    computedStyleObject() {
      let background;
      if (this.number <= 10) {
        background = "red";
      } else if (this.number <= 20) {
        background = "orange";
      } else if (this.number <= 30) {
        background = "yellow";
      } else if (this.number <= 40) {
        background = "blue";
      } else {
        background = "gray";
      }
      return {
        background,
      };
    },
  },

  methods: {},
};
</script>

<style scoped>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>

<!-- 정리할 것 

1. name: 'LottoBall',
2. props 전달
3. :style과 computed 계산값 리턴

 -->
