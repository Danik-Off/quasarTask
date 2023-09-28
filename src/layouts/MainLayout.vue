<template>
  <div class="q-pa-md">
    <div class="q-pa-md">
      <q-btn-dropdown color="primary" label="Выбор станции">
        <q-list>
          <q-item
            v-for="(item, index) in stations"
            :key="index"
            clickable
            v-close-popup
            @click="onItemClick(item)"
          >
            <q-item-section>
              <q-item-label>{{ item }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <q-table
      :key="keyTable"
      :title="filter"
      :rows="processedFilter(filter)"
      :columns="columns"
      row-key="id"
      @row-click="rowclick"
    >
    </q-table>
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
  data() {
    return {
      keyTable: 0,
      stations: new Set(),
      filter: "Все станции",
    };
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
  mounted() {
    this.stations.add("Все станции");
    for (const train of this.store.trains) {
      this.stations.add(train.station);
    }
  },
  computed: {},
  methods: {
    processedFilter(filter) {
      if (filter != "Все станции")
        return this.store.trains.filter((train) => train.station != filter);
      return this.store.trains;
    },
    onItemClick(station) {
      this.filter = station;
    },
    actions() {
      this.rows = this.store.trains;
      console.log(this.rows);
      this.keyTable++;
    },
    rowclick(evt, row) {
      this.$refs.banner.show(row.trainId, this.actions);
      console.log(evt, row);
    },
  },
};
</script>
