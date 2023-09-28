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
    updatedFromLocal() {
      const initialState = JSON.parse(localStorage.getItem("trainsStore"));
      console.log(initialState);
      if (initialState) this.$patch(initialState);
    },
    booking(trainId, seats) {
      console.log(seats);
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
