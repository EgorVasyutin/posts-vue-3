<template>
  <header>Посты</header>
  <div class="page">
    <div class="page-btns">
      <my-button @click="showDialog">Создать Пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <input v-model="searchQuery" class="search-post" placeholder="Поиск..." />

    <my-dialog v-model:show="dialogVisibility">
      <post-create @create="createPost"></post-create>
    </my-dialog>

    <div class="posts">
      <post
        v-if="posts.length !== 0"
        :posts="sortedPosts"
        @deletePost="deletePost"
      >
      </post>
      <div v-else>Постов нет</div>
    </div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--        v-for="pageNum in totalPage"-->
    <!--        :key="pageNum"-->
    <!--        class="pages"-->
    <!--        :class="{-->
    <!--          'current-page': page === pageNum,-->
    <!--        }"-->
    <!--        @click="changePage(pageNum)"-->
    <!--      >-->
    <!--        {{ pageNum }}-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="observer" ref="observer"></div>
  </div>
</template>

<script>
import myDialog from "@/components/UI/myDialog";
import Post from "@/components/Post";
import PostCreate from "@/components/PostCreate";
import MyButton from "@/components/UI/myButton";
import MySelect from "@/components/UI/my-select";
import axios from "axios";
export default {
  components: {
    MySelect,
    MyButton,
    Post,
    PostCreate,
    myDialog,
  },
  name: "App",

  data() {
    return {
      posts: [],
      dialogVisibility: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPage: 0,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisibility = false;
    },
    deletePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisibility = true;
    },
    // changePage(pageNum) {
    //   this.page = pageNum;
    // },
    async fetchPosts() {
      this.page++;
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=10",
        {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        }
      );
      this.totalPage = Math.ceil(
        response.headers["x-total-count"] / this.limit
      );
      this.posts = [...this.posts, ...response.data];
    },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((p1, p2) =>
        p1[this.selectedSort]?.localeCompare(p2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
  },
  mounted() {
    this.fetchPosts();

    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting && this.page < this.totalPage) {
        this.fetchPosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
};
</script>
<style lang="scss">
header {
  font-size: 30px;
  margin-top: 10px;
  text-align: center;
}
.search-post {
  width: 97%;
  margin-top: 15px;
  padding: 15px 10px;
  font-size: 18px;
  border: 1px solid #42b983;
}
.page {
  margin-top: 30px;
  padding-left: 10px;

  &-btns {
    display: flex;
    justify-content: space-between;
  }

  &__wrapper {
    display: flex;
    margin-top: 20px;
  }

  .pages {
    border: 1px solid black;
    padding: 10px;
  }

  .current-page {
    border: 1px solid #42b983;
    padding: 10px;
  }
}
.posts {
  margin-top: 30px;
  border: 1px solid #42b983;
  padding: 20px;
  display: flex;
  gap: 5px;
  flex-direction: column;
}
</style>
