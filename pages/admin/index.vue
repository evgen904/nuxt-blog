<template>
  <div>
    <h1>Welcome to admin page</h1>
  </div>
</template>

<script>
export default {
  name: 'PageAdmin',
  // в какой layout будет направлен роут
  layout: 'admin',
  middleware: ['admin-auth']
}
</script>

<style lang="scss" scoped>

</style>