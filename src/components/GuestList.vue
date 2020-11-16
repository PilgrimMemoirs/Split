<template>
  <div>
    <h2>Guest List</h2>
    <ul aria-labelledby="list-summary" class="stack-large">
      <li v-for="guest in guests" :key="guest.id">
        <Guest
          :name="guest.name"
          :paid="guest.paid"
          :id="guest.id"
          :tripNights="trip.nights"
          :nightsStaying="guest.nightsStaying"
          :totalOwed="formatTotal(guest.id)"
          @checkbox-changed="updatePaidStatus(guest.id)">
        </Guest>
      </li>
    </ul>
  </div>
</template>

<script>
import Guest from './Guest.vue'

export default {
  name: 'GuestList',
  components: {
    Guest,
  },
  props: {
    guests: {required: true, type: Array},
    trip: {required: true, type: Object},
    costPerGuest: {required: true, type: Object}
  },
  methods: {
    updatePaidStatus(guestId) {
      const guest = this.guests.find(guest => guest.id === guestId);
      guest.paid = !guest.paid;
    },
    formatTotal(guestId) {
      return parseFloat(this.costPerGuest[guestId]).toFixed(2);
    }
  }
}
</script>
