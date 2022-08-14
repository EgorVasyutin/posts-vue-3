<template>
  <transition-group name="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div class="post__name"><b>Название:</b> {{ post.title }}</div>
      <div class="post__description"><b>Описание:</b> {{ post.body }}</div>
      <my-button class="post_delete" @click="$router.push(`/posts/${post.id}`)"
        >открыть</my-button
      >
      <my-button class="post_delete" @click="$emit('deletePost', post)"
        >Удалить</my-button
      >
    </div>
  </transition-group>
</template>

<script>
import myButton from "@/components/UI/myButton";
export default {
  components: {
    myButton,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  name: "PostList",
};
</script>

<style scoped lang="scss">
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 1s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.post {
  padding: 15px 10px;
  border: 1px solid #42b983;
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  &__name {
    width: 100%;
    font-size: 24px;
  }

  &__description {
    width: 100%;
    font-size: 24px;
    margin-top: 5px;
  }
  &_delete {
    margin-top: 15px;
  }
}
</style>
