<template>
  <article class="post">
    <header class="post-header">
      <div class="post-title">
        <h1>Post title</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post-info">
        <small>
          <i class="el-icon-time"></i>
          {{ new Date().toLocaleString() }}
        </small>
        <small>
          <i class="el-icon-view"></i>
          42
        </small>
      </div>
      <div class="post-image">
        <img 
          src="https://cdn25.img.ria.ru/images/155976/42/1559764281_0:0:1920:1280_1440x900_80_0_1_c475a391916f18b3c56b23fabb77e3f2.jpg.webp" 
          alt="post image"
        />
      </div>
    </header>
    <main class="post-content">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat suscipit ducimus aliquid nostrum iure aut neque, harum libero quod non.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat suscipit ducimus aliquid nostrum iure aut neque, harum libero quod non.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat suscipit ducimus aliquid nostrum iure aut neque, harum libero quod non.
      </p>
    </main>
    <footer>
      <app-comment-form />

      <div class="comments" v-if="true">
        <app-comment
          v-for="comment in 4"
          :key="comment"
          :comment="comment"
        /> 
      </div>
      <div class="text-center" v-else>Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
import AppComment from "@/components/main/Comment"
import AppCommentForm from "@/components/main/CommentForm"

export default {
  name: "IdPost",
  // params - параметры адресной строки
  validate({params}) {
    return Boolean(params.id)
  },
  components: {
    AppComment,
    AppCommentForm
  }
}
</script>

<style lang="scss" scoped>
  .post {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    &-header {

      margin-bottom: 1.5rem;
      .post-title, .post-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      .post-info {
        margin-bottom: .5rem;    
      }
      .post-image img {
        width: 100%;
        height: auto;
      }
    }
    &-content {
      margin-bottom: 2rem;
    }
  }
</style>