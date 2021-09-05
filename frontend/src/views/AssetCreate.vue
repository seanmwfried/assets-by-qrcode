<template>
  <div class="container">
    <va-modal v-model="showModal" hide-default-actions>
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
          <va-button color="#baffc9" text-color="#000" @click="showModal = false">OK</va-button>
        </div>
      </template>
    </va-modal>
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
          this.errorMessage = "Asset name is required. Please enter an asset name to continue."
          this.showModal = true;
        } else if(!this.assetPassword) {
          this.errorMessage = "Asset password is required. Please enter an asset password and confirm it to continue."
          this.showModal = true;
        } else if(this.assetPassword !== this.assetPasswordRepeat){
          this.errorMessage = "Passwords do not match. Please try again."
          this.showModal = true;
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
            console.log(response)
            return response.json()
          })
          .then(data => {
            if(data.result){
              this.$router.push(`/asset/${data.assetID}`);
            } else {
              this.errorMessage = "There was an error. Please try again."
              console.log(data);
              this.showModal = true;
            }
          })
          .catch((error) => {
            this.errorMessage = "There was an error. Please try again."
            console.error('Error submitting asset data:', error);
            this.showModal = true;
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

  .error-heading {
    color: red;
    font-size: 2em;
  }
  
  .error-message {
    margin-top: 10px;
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