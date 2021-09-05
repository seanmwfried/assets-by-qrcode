<template>
  <div v-if="type == 'text'" class="asset-info-container">
    <div class="label">
      {{label}}
    </div>
    <div class="value">
      └ {{value}}
    </div>
  </div>
  <div v-else-if="type == 'checkbox'" class="asset-info-container">
    <div class="label">
      {{label}}
    </div>
    <div class="value checkbox-flex">
      └ <va-checkbox v-model="checkboxValue" readonly /> {{checkboxText}}
    </div>
  </div>
  <div v-else-if="type == 'date'" class="asset-info-container">
    <div class="label">
      {{label}}
    </div>
    <div class="value">
      └ {{dateText}}
    </div>
  </div>
  <div v-else class="asset-info-container">
    <div class="error">
      Error: Invalid data type.
    </div>
  </div>
</template>

<script>
  export default {
    props: ['type', 'label', 'value'],

    data() {
      return {
        checkboxValue: this.value
      }
    },

    computed: {
      checkboxText() {
        if(this.type !== 'checkbox') return null;
        if(this.value){
          return 'true/yes';
        } else {
          return 'false/no';
        }
      },

      dateText() {
        if(this.type !== 'date') return null;
        return new Date(this.value).toDateString();
      }
    }
  }

</script>

<style scoped>
  .asset-info-container {
    background-color: rgb(68, 70, 66);
    padding: 15px;
    border-radius: 10px;
  }

  .label {
    color: #ccc;
    text-decoration: underline;
  }

  .value {
    padding-left: 10px;
    font-size: 1.5em;
  }

  .value::first-letter {
    color: #ccc;
  }

  .checkbox-flex {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
</style>
