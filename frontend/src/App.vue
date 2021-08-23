<template>
  <n-config-provider :theme="darkTheme">
    <router-view/>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { darkTheme } from 'naive-ui';

export default {
  setup() {
    return {
      darkTheme
    }
  }
}
</script>