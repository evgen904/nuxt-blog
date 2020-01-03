<template>
  <el-card
    shadow="hover"
    :body-style="{padding: 0}"
    class="post"
  >
    <header slot="header" class="post-header">
      <h3>
        Post title
      </h3>

      <small>
        <i class="el-icon-time"></i>
        {{ new Date().toLocaleString() }}
      </small>
    </header>
    <div class="post-body">
      <img 
        src="https://cdn25.img.ria.ru/images/155976/42/1559764281_0:0:1920:1280_1440x900_80_0_1_c475a391916f18b3c56b23fabb77e3f2.jpg.webp" 
        alt="post image" 
        class="post-img"
      />
    </div>
    <footer class="post-footer">
      <el-button  round @click="openPost">Открыть</el-button>

      <span>
        <i class="el-icon-message"></i>
        12
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  name: "Post",
  methods: {
    openPost() {
      const id = 'test-id'
      this.$router.push(`/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    margin-bottom: 1.5rem;
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-body {
      .post-img {
        width: 100%;
        height: auto;
      }
    }
    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
  }
</style>