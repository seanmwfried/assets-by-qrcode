<template>
  <div class="container">
      <va-card dark stripe stripe-color="#baffc9">
          <va-card-title>Create A New Asset</va-card-title>
          <va-card-content class="grid">
              <div>
                <va-button color="#baffc9" text-color="#000">Add Field</va-button>
              </div>
              <div>
                <va-button color="#baffc9" text-color="#000">Finish</va-button>
              </div>
              <InputPicker />
          </va-card-content>
      </va-card>
  </div>
</template>

<script>
import InputPicker from '../components/InputPicker';

export default {
    components: {
        InputPicker
    }
}
</script>

<style scoped>
    .container {
        color: #fff;
        width: 100%;
        max-width: 800px;
        margin: auto;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
    }
</style>