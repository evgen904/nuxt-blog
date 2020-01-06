<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb> 
  </div>
</template>

<script>
export default {
  name: 'PostAdminId',
  layout: 'admin',
  middleware: ['admin-auth']
}
</script>