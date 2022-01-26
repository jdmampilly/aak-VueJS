<template>
  <b-container fluid>
    <!-- Main table element -->
    <b-table small :fields="fields" :items="this.leaveHistory" responsive="sm">
  
     <template #cell(t)="data">
        {{ data.item.dateFrom}}
      </template>
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      leaveHistory: [],
      totalRows: 0,
      currentPage: 0,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      fields: [
        { key: "id", label: "Id", sortable: true, sortDirection: "desc" },
        {
          key: "dateFrom",
          label: "Date From",
          sortable: true,
          sortDirection: "desc",
          formatter(value) {
            return moment(value).format("DD-MM-YYYY");
          },
        },
        {
          key: "dateTo",
          label: "Date to",
          sortable: true,
          sortDirection: "desc",
          formatter(value) {
            return moment(value).format("DD-MM-YYYY");
          },
        },
        {
          key: "leaveNature",
          label: "Action",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "leaveType",
          label: "Sick Leave",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "leaveType",
          label: "Annual Leave",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "leaveType",
          label: "Other Leave",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "leaveType",
          label: "Adjustment",
          sortable: true,
          sortDirection: "desc",
        },
          { key: 't', label: 'No. of Days' }
      
      ],
    };
  },
  created() {
    console.log("Created ", "");
  },
  mounted() {
    this.fetchLeaveHistory();
  },
  computed: {
    ...mapGetters([]),
  },
  components: {},
  filters: {
    formattedDate: function (value) {
      if (!value) return "";
      value = value.toString();
      return moment(String(value)).format("DD-MM-YYYY");
    },
  },
  methods: {
    ...mapActions([]),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async fetchLeaveHistory() {
      // this.$router.push({ name: 'home' }).catch(() => {})
      const url = process.env.VUE_APP_API_URL + `/leaveTransactions`;
      await axios
        .get(url)
        .then((response) => {
          return response;
        })
        .then((response) => {
          this.leaveHistory = response.data;
          // console.log(this.leaveHistory)
        });
    },
  },
};
</script>

<style></style>
