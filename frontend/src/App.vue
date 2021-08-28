<template>
  <div id='page'>
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  components: {
    NavBar
  },

  // setup() {
  //   return {
  //   }
  // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

html, body {
  background-color: #010101;
}

#page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>