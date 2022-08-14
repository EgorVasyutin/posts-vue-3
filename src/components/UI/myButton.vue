<template>
  <button class="btm"><slot></slot></button>
</template>

<script>
export default {
  name: "myButton",
};
</script>

<style scoped>
.btm {
  padding: 15px 10px;
  font-size: 18px;
  border: 1px solid #42b983;
  background: none;
  cursor: pointer;
}
</style>
