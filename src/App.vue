<template>
  <div id="app">
    <Header :title="site.title"></Header>
    <TripSummary
      :nights="trip.nights"
      :cost="trip.cost"
      :guests="guests.length"
      :paidGuests="paidGuests.length"
      >
    </TripSummary>
    <GuestForm
        :tripNights="trip.nights"
        @guest-added="addGuest">
    </GuestForm>
    <GuestList
      :guests="guests"
      :trip="trip"
      :costPerGuest="costPerGuest">
    </GuestList>
  </div>
</template>

<script>
import uniqueId from 'lodash.uniqueid';
import calculateCostPerGuest from './logic.js';
import Header from './components/Header.vue';
import TripSummary from './components/TripSummary.vue';
import GuestList from './components/GuestList.vue';
import GuestForm from './components/GuestForm.vue';

export default {
  name: 'App',
  components: {
    Header,
    TripSummary,
    GuestList,
    GuestForm
  },
  data() {
    return {
      site: {
        title: "Split"
      },
      trip: {
        nights: 5,
        cost: 500
      },
      guests: [
        { id: uniqueId('guest-'), name: "Jamie", nightsStaying: [1, 2, 3, 4], paid: false} ,
        { id: uniqueId('guest-'), name: "Ember", nightsStaying: [3, 4], paid: true },
        { id: uniqueId('guest-'), name: "Ash", nightsStaying: [2, 3, 4], paid: false },
      ]
    };
  },
  computed: {
    paidGuests() {
      return this.guests.filter(guest =>guest.paid);
    },
    costPerGuest() {
      return calculateCostPerGuest(this.guests, this.trip);
    }
  },
  methods: {
    addGuest(guestName, nightsStaying) {
      this.guests.push({id:uniqueId('guest-'), name: guestName, nightsStaying: nightsStaying, paid: false});
    }
  }
}
</script>

<style>
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*="__lg"] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
[class*="__lg"]:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*="__lg"] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*="stack"] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
/* End global styles */
#app {
  max-width: 50rem;
  background: #fff;
  margin: 0 auto;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>
