<template>
  <div class="container">
    <div class="remove-button-container">
      <va-button class="remove-button" color="#baffc9" text-color="#000" @click="removeSelf">X</va-button>
    </div>
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
    <va-input v-if="selectValue == 'text'"
      :label="inputLabel"
      v-model="inputValue"
    />
    <va-checkbox v-if="selectValue == 'checkbox'"
      :label="inputLabel"
      v-model="inputValue"
    />
    <div v-if="selectValue == 'date'">
      <span>{{inputLabel}}</span>
      <va-date-picker v-if="selectValue == 'date'"
        :label="inputLabel"
        color="#fff"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],

  data(){
    return {
      options: ['text', 'checkbox', 'date'],
      selectValue: 'text',
      inputName: '',
      inputValue: null
    }
  },

  methods: {
    removeSelf(){
      this.$emit('removeSelf', this.id);
    }
  },

  computed: {
    inputLabel(){
      if(!this.inputName){
        return "<No Label>";
      } else {
        return this.inputName;
      }
    }
  },

  watch: {
    selectValue: function (newValue){
      if(newValue == 'checkbox'){
        this.inputValue = false;
      } else {
        this.inputValue = null;
      }
    }
  }
}
</script>

<style scoped>
  .container {
      display: flex;
      flex-direction: column;
      gap: 5px;
  }

  .remove-button-container {
    text-align: right;
  }

  .remove-button div {
    padding: 0px;
  }

  .va-date-picker {
    --va-date-picker-text-color: white;
    --va-date-picker-focused-border-color: var(--projectGreen);
    --va-date-picker-today-text: black;
    --va-date-picker-today-background: white;
    --va-date-picker-selected-text: black;
    --va-date-picker-selected-background: var(--projectGreen);
  }
</style>