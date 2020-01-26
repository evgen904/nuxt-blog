<template>
  <div class="admin-layout-wrap">
    <el-container :style="{height: '100%'}">
      <el-aside width="250px">
        <app-aside />
      </el-aside>
      <el-main>
        <!-- Место куда будем рендерить стр. -->
        <nuxt />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppAside from "@/components/admin/Aside"

export default {
  components: {
    AppAside
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(val) {
      this.$message.error(val.response.data.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-layout-wrap {
  width: 100%;
  height: 100vh;
}
</style>