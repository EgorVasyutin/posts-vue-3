<template>
  <div class="navbar">
    <div @click="$router.push('/')" style="cursor: pointer">Название</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')" style="margin-left: 20px"
        >Посты</my-button
      >
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/myButton";
export default {
  name: "NavBar",
  components: { MyButton },
};
</script>

<style scoped>
.navbar {
  height: 70px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
