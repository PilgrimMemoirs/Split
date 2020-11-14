<template>
  <form @submit.prevent="onSubmit">
    <h2 class="label-wrapper">
      <label for="new-guest-input" class="label__lg">
        Add New Guest
      </label>
    </h2>

    <input
      type="text"
      id="new-guest-input"
      name="new-guest"
      autocomplete="off"
      v-model.lazy.trim="name"
      class="input__lg"
      placeholder="Guest Name"
    />

    <h2> Nights Staying </h2>
    <ul>
      <li v-for="night in tripNights" :key="night">
      <input type="checkbox" class="checkbox" :id="night" :value="night" v-model="nightsStaying">
        <label :for="nightsStaying" class="checkbox-label">Night {{night}}</label>
      </li>
    </ul>

    <button class="btn btn__primary btn__lg" type ="submit">
      Add
    </button>
  </form>
</template>

<script>
  export default {
    props: {
      tripNights: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        name: "",
        nightsStaying: []
      }
    },
    methods: {
      onSubmit() {
        if(this.name === "") {
          return;
        }
        this.$emit("guest-added", this.name, this.nightsStaying);
        this.name = "";
        this.nightsStaying = [];
      }
    }
  };
</script>
