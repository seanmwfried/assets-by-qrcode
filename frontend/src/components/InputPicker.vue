<template>
  <div class="ip-container">
    <div class="remove-button-container">
      <va-select
        color="primary"
        :options="options"
        v-model="selectValue"
        style="color: black;"
      />
      <va-button class="remove-button" color="#baffc9" text-color="#000" :rounded="false" @click="removeSelf">X</va-button>
    </div>
    <va-input
      label="Field Label"
      v-model="inputName"
    />
    <va-input v-if="selectValue == 'text'"
      :label="inputLabel"
      v-model="inputValue"
    />
    <div class="checkbox-container" v-if="selectValue == 'checkbox'">
      <va-checkbox 
        :label="inputLabel"
        v-model="inputValue"
      />
    </div>
    <va-date-input v-if="selectValue == 'date'"
      :label="inputLabel"
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  props: ['id', 'inData'],

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
  },

  mounted(){
    //Initialize values with prop object if available
    if(this.inData){
      this.selectValue = this.inData.inputType || 'text';
      this.inputName   = this.inData.inputLabel || '';
      if(this.inData.inputType === 'date'){
        console.log(this.inData.inputValue);
        console.log(new Date(this.inData.inputValue));
        console.log(new Date(this.inData.inputValue).toISOString());
        //va-date-input doesn't seem to like setting the value immediately
        setTimeout(() => {this.inputValue = new Date(this.inData.inputValue);}, 50);
      } else {
        this.inputValue  = this.inData.inputValue || '';
      }
    } else {
      this.selectValue = 'text';
      this.inputName   = '';
      this.inputValue  = '';
    }
  }
}
</script>

<style scoped>
  .ip-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
      background-color: rgb(68, 70, 66);
      padding: 10px;
      border-radius: 10px;
  }

  .remove-button-container {
    display: flex;
    gap: 10px;
  }

  .remove-button div {
    padding: 0px;
  }

  .checkbox-container {
    height: 36px;
    display: flex;
    align-items: center;
  }
</style>

<style>
.va-dropdown {
    width: 100%;
  }
</style>