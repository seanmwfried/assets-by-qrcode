<template>
  <va-navbar color="#baffc9" shape class="nav">
      <template #left>
          <va-navbar-item>
            <va-button class="logo" flat color="rgb(38, 40, 36)" to="/">
              ITEMDEX
            </va-button>
          </va-navbar-item>
      </template>
      <template #right>
          <va-navbar-item>
              <va-button color="rgb(38, 40, 36)" to="/asset/create">
                  Create Asset
              </va-button>
          </va-navbar-item>
      </template>
  </va-navbar>
</template>

<script>
export default {

}
</script>

<style scoped>
    .logo {
        font-weight: 700;
        letter-spacing: .6px;
        text-transform: uppercase;
        line-height: 1.2;
    }
    
    .nav {
        min-height: 65px;
    }
</style>

<style>
    /* Override inline styles added by Vuestic
     * 
     * This element gets added later by Vuestic and needs to be accessed globally.
     * We only have 1 of these though, so I'm ok with this, even though it feels yucky.
     *
     */

    .va-navbar__background-shape {
        border-top-color: #010101 !important;
    }
</style>