<template>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-teal text-white" style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Поездн №{{ train.trainId }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-btn-group push>
          <q-btn
            v-for="seat in seats"
            :id="seat.id"
            @click="onFreeSeatClick"
            :disabled="seat.status"
            :class="seat.choosen ? 'choosenButton' : null"
            :key="seat.id + +seat.status"
            :label="seat.id"
            padding="lg"
            color="primary"
          ></q-btn>
        </q-btn-group>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Отмена" v-close-popup />
        <q-btn flat label="Заказать" @click="bookingEnd" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style>
.choosenButton {
  border: 1px solid red;
}
</style>
<script>
import { ref } from "vue";
import { useTrainsStore } from "../stores/trainStore";

export default {
  name: "BannerLayout",
  props: ["trainId"],

  setup() {
    const store = useTrainsStore();
    return {
      store,
      persistent: ref(false),
    };
  },
  data() {
    return {
      seats: [],
      lastUpId: 0,
      train: {},
    };
  },
  methods: {
    bookingEnd() {
      let seats = this.seats.map((seat) => {
        let st = { id: seat.id, status: seat.status };
        if (!st.status && seat.choosen == true) {
          st.status = true;
        }
        return st;
      });
      this.store.booking(this.train.trainId, seats);
      this.persistent = false;
      this.store.updatedFromLocal();
    },
    onFreeSeatClick(e) {
      let button = e.currentTarget;
      let id = button.id;
      this.seats = this.seats.map((seat) => {
        if (seat.id == id) {
          if (seat.choosen)
            return { id: seat.id, status: seat.status, choosen: false };
          else return { id: seat.id, status: seat.status, choosen: true };
        }
        return seat;
      });
      console.log(this.seats);
    },
    show(trainId, callback) {
      callback();
      this.train = this.store.trains.find(
        (train) => train.trainId === +trainId
      );
      console.log(this.train);
      this.seats = this.train.seats.map((seat) => {
        return { id: seat.id, status: seat.status, choosen: false };
      });
      this.persistent = true;
    },
  },
};
</script>
