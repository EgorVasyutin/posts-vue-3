<template>
  <div class="creating-post">
    <input
      :value="post.name"
      @input="post.name = $event.target.value"
      class="creating-post__input"
      placeholder="Название"
    />
    <input
      :value="post.body"
      @input="post.body = $event.target.value"
      class="creating-post__input"
      placeholder="Описание"
    />
    <my-button class="creating-post__btm" @click="createPost"
      >Создать</my-button
    >
  </div>
</template>

<script>
import myButton from "@/components/UI/myButton";
export default {
  components: {
    myButton,
  },
  name: "PostCreate",
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.creating-post {
  border: 1px solid #42b983;
  padding: 20px;
  display: flex;
  gap: 5px;
  flex-direction: column;

  &__input {
    padding: 15px 10px;
    font-size: 18px;
    border: 1px solid #42b983;
  }

  &__btm {
    margin-top: 15px;
  }
}
</style>
