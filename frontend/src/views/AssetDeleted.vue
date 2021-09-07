<template>
  <va-card class="del-container" dark stripe stripe-color="#baffc9">
    <va-card-content class="flex">
      Asset Deleted
      <va-button color="#baffc9" text-color="#000" to="/asset/create">Create New Asset</va-button>
    </va-card-content>
  </va-card>
</template>

<style scoped>
  .del-container {
    margin: auto;
    margin-top: 25px;
    max-width: 400px;
  }

  .flex {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
