<template>
  <div>
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
