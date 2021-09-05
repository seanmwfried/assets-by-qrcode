<template>
  <div id='page'>
    <NavBar />
    <ErrorModal />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import ErrorModal from './components/ErrorModal';

export default {
  components: {
    NavBar,
    ErrorModal
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

:root{
  --projectGreen: #baffc9;
}

html, body {
  background-color: #010101;
}

#page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>