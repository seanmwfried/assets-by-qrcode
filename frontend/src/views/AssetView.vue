<template>
  <va-card class="asset-container" dark stripe stripe-color="#baffc9">
    <va-card-content v-if="loaded">
      <div class="asset-banner">
        <QRCode class="qrcode" :dataURI="qrCodeURI" />
        <div class="asset-name-container">
          <div class="asset-name-label">
            Asset Name
          </div>
          <div class="asset-name-text">
            {{assetName}}
          </div>
          <div class="asset-actions">
            <va-button color="#baffc9" text-color="#000" :to="'/modify/' + assetID">Modify</va-button>
            <va-button color="#baffc9" text-color="#000">Delete</va-button>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="asset-info-bits-container">
        <AssetInfoBit 
          v-for="(field, i) in fields" 
          :key="i"
          :type="field.inputType"
          :label="field.inputLabel"
          :value="field.inputValue"
        />
      </div>
    </va-card-content>
  </va-card>
</template>

<script>
  import AssetInfoBit from '../components/AssetInfoBit';
  import QRCode from '../components/QRCode';

  export default {
    props: ['assetID'],

    components: {
      QRCode,
      AssetInfoBit
    },

    data(){
      return {
        loaded: false,
        qrCodeURI: '',
        assetName: '<No Name>',
        fields: []
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
          this.qrCodeURI = data.asset.qrData;
          this.assetName = data.asset.name;
          this.fields = JSON.parse(data.asset.fields);
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
  .asset-container {
    margin: 25px auto;
    width: 100%;
    max-width: 1200px;
  }

  .asset-banner {
    display: flex;
    gap: 10px;
  }

  .asset-name-container {
    display: flex;
    flex-direction: column;
    background-color: rgb(68, 70, 66);
    width: 100%;
    border-radius: 10px;
    padding: 25px;
  }

  .asset-name-label {
    color: #ccc;
  }

  .asset-name-text {
    font-size: 2em;
    margin-bottom: 15px;
  }

  .asset-actions {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 10px;
  }

  .divider {
    background-color: var(--projectGreen);
    height: 5px;
    width: 100%;
    border-radius: 3px;
    margin: 10px auto;
  }

  .asset-info-bits-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  @media screen and (max-width: 1205px) {
    .asset-container {
      max-width: 800px;
    }

    .asset-info-bits-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 805px) {
    .asset-container {
      width: 90%;
      max-width: 90%;
    }

    .asset-info-bits-container {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 600px) {
    .asset-banner {
      flex-direction: column;
      align-items: center;
    }

    .asset-name-container {
      order: -1;
    }
  }
</style>