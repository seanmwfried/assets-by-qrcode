<template>
  <div class="container">
      <va-card dark stripe stripe-color="#baffc9">
          <va-card-title>Create A New Asset</va-card-title>
          <va-card-content class="grid">
              <div class="center-button">
                <va-button color="#baffc9" text-color="#000" @click="addField">Add Field</va-button>
              </div>
              <div class="center-button">
                <va-button color="#baffc9" text-color="#000">Finish</va-button>
              </div>
              <InputPicker 
                v-for="id in inputFields" 
                :key="id"
                :id="id"
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
            inputFields: []
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
        }
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

    .center-button {
        text-align: center;
    }
</style>