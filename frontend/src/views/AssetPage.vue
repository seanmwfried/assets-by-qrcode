<template>
  <va-card dark stripe stripe-color="#baffc9">
    <va-card-content v-if="loaded">
      <div class="asset-banner">
        <QRCode :dataURI="qrCodeURI" />
        <div class="asset-name-container">
          <span class="asset-name-label">
            Asset Name
          </span>
          <span class="asset-name-text">
            {{assetName}}
          </span>
        </div>
      </div>
      <AssetInfoBit 
        v-for="(field, i) in fields" 
        :key="i"
        :type="field.inputType"
        :label="field.inputLabel"
        :value="field.inputValue"
      />
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
      fetch(`http://localhost:3000/asset`, {
              method: 'POST',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(assetData)
      })
      .then(response => response.json())
      .then(data => {
        if(data.result){
          // Fill out data
          console.log(data);
          this.loaded = true;
          this.qrCodeURI = data.asset.qrData;
          this.assetName = data.asset.name;
          this.fields = JSON.parse(data.asset.fields);
        } else {
          console.log(data);
          //TODO: Handle failure
        }
      })
      .catch((error) => {
        //TODO: Alert user of error, please try again
        console.error('Error submitting asset data:', error);
      })
    }
  }
</script>

<style scoped>
  .asset-banner {
    display: flex;
  }
</style>