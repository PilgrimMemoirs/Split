let guestsPerNight = (guests, trip) => {
  let guestsPerNightList = new Array(trip.nights).fill(0);

  for (const guest of guests) {
    for (const night of guest.nightsStaying) {
      guestsPerNightList[night - 1] += 1;
    }
  }
  return guestsPerNightList;
};

let costPerNightByGuestsStaying = (guests, trip) => {
  const costPerNight = trip.cost / trip.nights;
  let costPerGuestPerNight = [];

  for (const guestsNum of guestsPerNight(guests, trip)) {
    costPerGuestPerNight.push(costPerNight / guestsNum);
  }

  return costPerGuestPerNight;
};


export default (guests, trip) => {
  let totals = {};

  for (const guest of guests) {
    let total = 0;
    for (const night of guest.nightsStaying) {
      total += costPerNightByGuestsStaying(guests, trip)[night - 1];
    }
    totals[guest.id] = total;
  }

  return totals;
};
