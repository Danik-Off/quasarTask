import { defineStore } from "pinia";
import { toRef, ref } from "vue";

export const useTrainsStore = defineStore("trains", {
  state: () => ({
    key: 0,
    trains: [
      {
        trainId: 2,
        station: "Липецк",
        seats: [
          { id: 1, status: false },
          { id: 2, status: false },
          { id: 3, status: false },
          { id: 4, status: false },
        ],
      },
      {
        trainId: 212313,
        station: "Воронеж",
        seats: [
          { id: 1, status: false },
          { id: 2, status: false },
          { id: 3, status: false },
          { id: 4, status: false },
        ],
      },
    ],
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    booking(trainId, seats) {
      this.$patch((state) => {
        state.trains.map((train) => {
          if (train.trainId == trainId) {
            train.seats = seats;
          }
          return train;
        });
      });
    },
  },
});
