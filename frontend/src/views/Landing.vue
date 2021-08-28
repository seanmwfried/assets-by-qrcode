<template>
  <div class="container">
    <div class="landing">
      <va-card class="landing-card" dark stripe stripe-color="#baffc9">
        <va-card-title class="justify--center">
          <span class="site-heading">ItemDex</span>
        </va-card-title>
        <hr>
        <va-card-content>
          <p>ItemDex is a simple website designed to show off a Vue SPA with a simple backend using Node, Express, and MongoDB. This application uses Vue 3, but without the composition API, as I didn't feel like it was necessary for this project. It also uses the Vuestic-UI component library.</p>
          <p>Instead of opting for the usual sign-up then sign-in structure, in order to make this more easily accessible by those checking out my portfolio, I decided to use a per asset password system. This obviously isn't ideal should this be a real app, but I figured it would make more sense to get you into the application without doing the sign-up jig.</p>
          <p>To get started, click the button below, and you'll be taken to the SPA to begin inputting information. Once completed, you'll be taken to your new asset's page, along with a QR code to be used for quick access to that asset's information.</p>
        </va-card-content>
        <div class="button-container">
          <va-button to="/create" color="#baffc9" text-color="#000">Get Started</va-button>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .landing-card {
    width: 75vw;
    max-width: 600px;
  }

  .site-heading {
    font-size: 2rem;
  }

  hr {
    margin: 0 auto;
    width: 90%;
  }

  p {
    margin-top: 1em;
    text-indent: 2em;
  }

  .button-container {
    width: 100%;
    text-align: center;
    padding-bottom: 2em;
  }
</style>