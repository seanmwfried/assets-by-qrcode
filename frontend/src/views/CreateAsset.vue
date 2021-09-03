<template>
  <div class="container">
    <va-card dark stripe stripe-color="#baffc9">
      <va-card-title>Create A New Asset</va-card-title>
      <va-card-content class="grid">
        <div class="center-button">
          <va-button color="#baffc9" text-color="#000" @click="addField">Add Field</va-button>
        </div>
        <div class="center-button">
          <va-button color="#baffc9" text-color="#000" @click="sendData">Finish</va-button>
        </div>
        <div class="asset-name-field-container">
          <va-input
            label="Asset Name (Required)"
            v-model="assetName"
          />
        </div>
        <InputPicker 
          v-for="id in inputFields" 
          :key="id"
          :id="id"
          :ref="id"
          @removeSelf="removeField"
        />
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import InputPicker from '../components/InputPicker';

export default {
  components: {
    InputPicker
  },

  data() {
    return {
      inputFields: [],
      assetName: ''
    }
  },

  methods: {
    addField() {
      //Create unique ID for easy element removal
      this.inputFields.push(uuid());
    },

    removeField(inID) {
      const elementIndex = this.inputFields.indexOf(inID);
      this.inputFields.splice(elementIndex, 1);
    },

    sendData(){
      if(!this.assetName){
        //TODO: Alert user that assetName is required
        console.log("Asset Name is empty");
      } else{
        const formData = [];
        formData.push({assetName: this.assetName});
        this.inputFields.forEach(id => {
          const inputPicker = this.$refs[id];
          formData.push({
            inputType:  inputPicker.selectValue,
            inputLabel: inputPicker.inputName,
            inputValue: inputPicker.inputValue
          });
        })
        //TODO: Send info to backend
      }
    }
  }
}
</script>

<style scoped>
  .container {
    color: #fff;
    max-width: 1200px;
    margin: 25px auto;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }

  @media screen and (max-width: 1205px) {
    .container {
      max-width: 800px;
    }

    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 805px) {
    .container {
      width: 90%;
      max-width: 90%;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }

  .center-button {
    text-align: center;
  }

  .asset-name-field-container {
    align-self: center;
  }
</style>

<style>
  .remove-button .va-button__content {
    padding: 0;
  }
</style>