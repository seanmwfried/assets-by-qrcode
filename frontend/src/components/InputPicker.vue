<template>
  <div class="container">
      <va-select
        color="primary"
        :options="options"
        v-model="selectValue"
        style="color: black;"
      />
      <va-input
        label="Field Label"
        v-model="inputName"

      />
      <va-input 
        :label="inputName + ' Data'"
      />
  </div>
</template>

<script>
export default {
    data(){
        return {
            options: ['text', 'checkbox', 'date'],
            selectValue: 'text',
            inputName: ''
        }
    },

    computed: {
        //Create value for rendering third input label to either "Please input name in previous field", etc
    }
}
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
</style>