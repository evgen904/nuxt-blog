<template>
  <el-container>
    <el-header>
      <app-navigation />
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer />
  </el-container>
</template>

<script>
import AppNavigation from "@/components/main/Navigation"

export default {
  name: "Default layouts",
  components: {
    AppNavigation
  }
}
</script>

<style>
</style>
