<template>
  <div>{{assetID}}</div>
</template>

<script>
export default {
  props: ['assetID'],

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

<style>

</style>