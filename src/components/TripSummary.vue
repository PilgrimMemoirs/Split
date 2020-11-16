<template>
  <div id="trip-summary">
    <h2> Trip Details </h2>
    <h3>{{nights}} Nights</h3>
    <h3>${{cost}} Total Cost</h3>
    <h3 id="list-summary" ref="listSummary" tabindex="-1">
      {{paidGuests}} out of {{guests}} paid.
    </h3>
  </div>
</template>

<script>
  export default {
    name: 'TripSummary',
    props: {
      nights: {default: 0, type: Number},
      cost: {default: 0, type: Number},
      guests: {default: 0, type: Number},
      paidGuests: {default: 0, type: Number},
    }
  }
</script>

<style scoped>

@media screen and (min-width: 1000px) {
  #trip-summary {
    position: fixed;
    top: 10rem;
    left: 5rem;
  }
}
</style>
