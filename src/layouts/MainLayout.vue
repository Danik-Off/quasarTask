<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      @row-click="rowclick"
    />
    <BannerLayout ref="banner"></BannerLayout>
  </div>
</template>

<script>
import { useTrainsStore } from "../stores/trainStore";
import BannerLayout from "./BannerLayout.vue";
const columns = [
  {
    name: "trainId",
    required: true,
    label: "# Поезда",
    align: "left",
    field: "trainId",
    sortable: true,
  },
  {
    name: "station",
    align: "center",
    label: "Станция",
    field: "station",
    sortable: true,
  },
  {
    name: "freeSeats",
    align: "center",
    label: "Свободных мест",
    field: (row) => row.seats.filter((seat) => !seat.status).length,
    sortable: true,
  },
  {
    name: "allSeats",
    align: "center",
    label: "Всего мест",
    field: (row) => row.seats.length,
    format: (val) => `${val}`,
    sortable: true,
  },
];

export default {
  name: "MainLayout",
  components: {
    BannerLayout,
  },
  updated() {
    const initialState = JSON.parse(localStorage.getItem("trainsStore"));
    if (initialState) store.$patch(initialState);
  },
  setup() {
    const store = useTrainsStore();
    const initialState = JSON.parse(localStorage.getItem("trainsStore"));
    if (initialState) store.$patch(initialState);
    store.$subscribe((mutation, state) => {
      const key = Math.random();
      state.key = key;
      localStorage.setItem("trainsStore", JSON.stringify(state));
    });
    return {
      store,
      columns,
      rows: store.trains,
    };
  },
  methods: {
    actions() {
      console.log("oi");
      const initialState = JSON.parse(localStorage.getItem("trainsStore"));
      if (initialState) this.store.$patch(initialState);
    },
    rowclick(evt, row) {
      this.$refs.banner.show(row.trainId, this.actions);
      console.log(evt, row);
    },
  },
};
</script>
