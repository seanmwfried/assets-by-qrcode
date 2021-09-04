<template>
  <div v-if="type == 'text'" class="asset-info-container">
    <span class="label">
      {{label}}
    </span>
    <span class="value">
      {{value}}
    </span>
  </div>
  <div v-else-if="type == 'checkbox'" class="asset-info-container">
    <span class="label">
      {{label}}
    </span>
    <span class="value">
      {{value}}
    </span>
  </div>
  <div v-else-if="type == 'date'" class="asset-info-container">
    <span class="label">
      {{label}}
    </span>
    <span class="value">
      {{value}}
    </span>
  </div>
  <div v-else class="asset-info-container">
    <span class="error">
      Error: Invalid data type.
    </span>
  </div>
</template>

<script>
  export default {
    props: ['type', 'label', 'value']
  }
</script>

<style scoped>
  
</style>
