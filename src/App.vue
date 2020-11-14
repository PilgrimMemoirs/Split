<template>
  <div id="app">
    <h1>Split</h1>

    <div>
      <h2> Trip Details </h2>

      <div>
        <h3>{{Trip.nights}} Nights</h3>
      </div>

      <div>
        <h3>${{Trip.cost}} Total Cost</h3>
      </div>

      <h3 id="list-summary" ref="listSummary" tabindex="-1">{{listSummary}}</h3>
    </div>

    <hr>

    <ul aria-labelledby="list-summary" class="stack-large">

      <li v-for="guest in GuestList" :key="guest.id">

        <guest
          :name="guest.name"
          :paid="guest.paid"
          :id="guest.id"
          :tripNights="Trip.nights"
          :nightsStaying="guest.nightsStaying"
          :totalOwed="costPerGuest[guest.id]"
          @checkbox-changed="updatePaidStatus(guest.id)"
          @guest-deleted="deleteGuest(guest.id)"
          @guest-edited="editGuest(guest.id, $event)">
        </guest>
      </li>

    </ul>

    <hr>
    <guest-form
        :tripNights="Trip.nights"
        @guest-added="addGuest">
    </guest-form>
  </div>
</template>

<script>
import uniqueId from 'lodash.uniqueid';
import Guest from './components/Guest.vue';
import GuestForm from './components/GuestForm.vue';

export default {
  name: 'App',
  components: {
    Guest,
    GuestForm
  },
  data() {
    return {
      Trip: {
        startDate: new Date(2021, 1, 10),
        nights: 5,
        cost: 500
      },
      GuestList: [
        { id: uniqueId('guest-'), name: "Jamie", nightsStaying: [1, 2, 3, 4], paid: false} ,
        { id: uniqueId('guest-'), name: "Ember", nightsStaying: [3, 4], paid: true },
        { id: uniqueId('guest-'), name: "Ash", nightsStaying: [2, 3, 4], paid: false },
      ]
    };
  },
  methods: {
    addGuest(guestName, nightsStaying) {
      console.log(nightsStaying);
      this.GuestList.push({id:uniqueId('guest-'), name: guestName, nightsStaying: nightsStaying, paid: false});
    },
    updatePaidStatus(guestId) {
      const guest = this.GuestList.find(guest => guest.id === guestId);
      guest.paid = !guest.paid;
    },
    deleteGuest(guestId) {
      const guestIndex = this.GuestList.findIndex(guest => guest.id === guestId);
      this.GuestList.splice(guestIndex, 1);
      this.$refs.listSummary.focus();
    },
    editGuest(guestId, newName) {
      const guestToEdit = this.GuestList.find(guest => guest.id === guestId);
      guestToEdit.name = newName;
    },
    guestsPerNight() {
      let guestsPerNightList = new Array(this.Trip.nights).fill(0);

      for (const guest of this.GuestList) {
        for (const night of guest.nightsStaying) {
          guestsPerNightList[night - 1] += 1;
        }
      }
      return guestsPerNightList;
    },
    costPerNightByGuestsStaying() {
      const costPerNight = this.Trip.cost / this.Trip.nights;
      let costPerGuestPerNight = [];

      for (const guests of this.guestsPerNight()) {
        costPerGuestPerNight.push(costPerNight / guests);
      }

      return costPerGuestPerNight;
    }
  },
  computed: {
    listSummary() {
      const paidGuests = this.GuestList.filter(guest =>guest.paid).length;
      return `${paidGuests} out of ${this.GuestList.length} paid`;
    },
    costPerGuest() {
      let totals = {};

      for (const guest of this.GuestList) {
        let total = 0;
        for (const night of guest.nightsStaying) {
          total += this.costPerNightByGuestsStaying()[night - 1];
        }
        totals[guest.id] = total;
      }

      return totals;
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
  background: #fff;
  margin: 2rem 0 4rem 0;
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
