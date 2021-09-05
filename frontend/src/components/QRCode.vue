<template>
  <img :src="dataURI" alt="QRCode" />
</template>

<script>
  export default {
    props: ['dataURI']
  }
</script>

<style scoped>
  img {
    border-radius: 10px;
  }
</style>
