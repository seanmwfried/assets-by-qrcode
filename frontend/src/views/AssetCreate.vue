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
        <div class="asset-required-fields-container">
          <va-input
            label="Asset Name (Required)"
            v-model="assetName"
          />
          <va-input
            type="password"
            label="Asset Password (Required)"
            v-model="assetPassword"
          />
          <va-input
            type="password"
            label="Repeat Password"
            v-model="assetPasswordRepeat"
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
        assetName: '',
        assetPassword: '',
        assetPasswordRepeat: '',
        showModal: false,
        errorMessage: "Default error message"
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
        //Check required fields for proper data
        if(!this.assetName){
          this.$store.dispatch('setErrorMessageAndShowModal', 'Asset name is required. Please enter an asset name to continue.');
        } else if(!this.assetPassword) {
          this.$store.dispatch('setErrorMessageAndShowModal', 'Asset password is required. Please enter an asset password and confirm it to continue.');
        } else if(this.assetPassword !== this.assetPasswordRepeat){
          this.$store.dispatch('setErrorMessageAndShowModal', 'Passwords do not match. Please try again.');
        } else {
          //Gather data to send
          const formDataArray = [];
          formDataArray.push({ assetName: this.assetName, assetPassword: this.assetPassword });
          this.inputFields.forEach(id => {
            const inputPicker = this.$refs[id];
            formDataArray.push({
              inputType:  inputPicker.selectValue,
              inputLabel: inputPicker.inputName,
              inputValue: inputPicker.inputValue
            });
          })

          const formData = JSON.stringify({data: formDataArray});

          //Send data & handle response
          fetch(`${process.env.VUE_APP_BACKEND_URL}/asset/create`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: formData
          })
          .then(response => {
            return response.json()
          })
          .then(data => {
            if(data.result){
              this.$router.push(`/asset/${data.assetID}`);
            } else {
              this.$store.dispatch('setErrorMessageAndShowModal', 'There was an error. Please try again.');
            }
          })
          .catch(() => {
            this.$store.dispatch('setErrorMessageAndShowModal', 'There was an error. Please try again.');
          })
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

  .asset-required-fields-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    border-radius: 10px;
  }
</style>