<template>
<va-modal :model-value="showModal" hide-default-actions>
    <template #header>
      <span class="error-heading">ERROR</span>
    </template>
    <slot>
      <p class="error-message">
        {{ errorMessage }}
      </p>
    </slot>
    <template #footer>
      <div class="error-action">
        <va-button color="#baffc9" text-color="#000" @click="$store.dispatch('hideModal')">OK</va-button>
      </div>
    </template>
  </va-modal>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    props: ['z-index'],

    computed: {
      ...mapGetters([
        'errorMessage',
        'showModal'
      ])
    }
  }
</script>

<style scoped>
  .error-heading {
    color: red;
    font-size: 2em;
  }
  
  .error-message {
    margin-top: 10px;
    color: white;
  }

  .error-action {
    text-align: right;
    width: 100%;
  }
</style>

<style>
  /* Color prop seems bugged on Vuestic-UI modal component */
  /* Globally overriding for now */
  .va-modal__dialog {
    --va-modal-dialog-background: rgb(68, 70, 66);
  }
</style>