<template>
  <div class="container">
    <va-modal 
      v-model="showModal" 
      @close="passwordInput = ''" 
      hide-default-actions
      ref="modal"
    >
      <slot>
        <va-input
          type="password"
          v-model="passwordInput"
          :label="assetName + ' Asset Password'"
        />
      </slot>
      <template #footer>
        <div class="button-container">
          <va-button outline text-color="#bbb" color="#bbb" @click="$refs.modal.hide()">Cancel</va-button>
          <va-button color="#baffc9" text-color="#000" @click="sendUpdate">OK</va-button>
        </div>
      </template>
    </va-modal>
    <va-card v-if="loaded" dark stripe stripe-color="#baffc9">
      <va-card-title>Modify {{ assetName }}</va-card-title>
      <va-card-content class="grid">
        <div class="center-button">
          <va-button color="#baffc9" text-color="#000" @click="addField">Add Field</va-button>
        </div>
        <div class="center-button">
          <va-button color="#baffc9" text-color="#000" @click="showModal = true">Update</va-button>
        </div>
        <div class="asset-required-fields-container">
          <va-input
            label="Asset Name (Required)"
            v-model="assetName"
          />
        </div>
        <InputPicker 
          v-for="fieldData in fields" 
          :key="fieldData.id"
          :id="fieldData.id"
          :ref="fieldData.id"
          :inData="fieldData"
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
    props: ['assetID'],

    components: {
      InputPicker
    },

    data() {
      return {
        loaded: false,
        assetName: '',
        fields: [],
        showModal: false,
        passwordInput: '',
      }
    },

    methods: {
      removeField(inID) {
        this.fields = this.fields.filter(field => field.id !== inID);
      },

      addField(){
        this.fields.push({ id: uuid() });
      },

      sendUpdate() {
        this.showModal = false;
        //Gather data to send
        const formDataArray = [];
        formDataArray.push({ 
          assetName: this.assetName, 
          passwordAttempt: this.passwordInput,
          _id: this.assetID
        });
        this.fields.forEach(field => {
          const inputPicker = this.$refs[field.id];
          formDataArray.push({
            inputType:  inputPicker.selectValue,
            inputLabel: inputPicker.inputName,
            inputValue: inputPicker.inputValue
          });
        });

        console.log(formDataArray);

        const formData = JSON.stringify(formDataArray);

        fetch(`${process.env.VUE_APP_BACKEND_URL}/asset/modify`, {
              method: 'POST',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: formData
        })
        .then(response => response.json())
        .then(data => {
          if(data.result){
            this.$router.push(`/asset/${this.assetID}`);
          } else {
            this.$store.dispatch('setErrorMessageAndShowModal', 'There was an error retrieving asset data. Please try again later.');
          }
        })
        .catch(() => {
            this.$store.dispatch('setErrorMessageAndShowModal', 'There was an error retrieving asset data. Please try again later.');
        });
      }
    },

    mounted() {
      const assetData = { assetID: this.assetID };
      fetch(`${process.env.VUE_APP_BACKEND_URL}/asset`, {
              method: 'POST',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(assetData)
      })
      .then(response => response.json())
      .then(data => {
        if(data.result){
          // Fill out data
          this.loaded = true;
          this.assetName = data.asset.name;
          this.fields = JSON.parse(data.asset.fields);
          //Assign ID for InputPicker
          this.fields.forEach(field => {
            field.id = uuid();
          });
        } else {
          this.$store.dispatch('setErrorMessageAndShowModal', 'There was an error retrieving asset data. Please try again later.');
        }
      })
      .catch(() => {
          this.$store.dispatch('setErrorMessageAndShowModal', 'There was an error retrieving asset data. Please try again later.');
      })
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
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
  }

  .button-container {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
</style>
