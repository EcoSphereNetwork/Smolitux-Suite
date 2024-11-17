<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template #header>
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{ $t("dashboard.totalShipments") }}
                </h5>
                <h2 class="card-title">{{ $t("dashboard.performance") }}</h2>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons"
                >
                  <label
                    v-for="(option, index) in bigLineChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{ active: bigLineChart.activeIndex === index }"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index)"
                      name="options"
                      autocomplete="off"
                      :checked="bigLineChart.activeIndex === index"
                    />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template #header>
            <h5 class="card-category">{{ $t("dashboard.totalShipments") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i> 763,215
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="purple-line-chart"
              :chart-data="purpleLineChart.chartData"
              :gradient-colors="purpleLineChart.gradientColors"
              :gradient-stops="purpleLineChart.gradientStops"
              :extra-options="purpleLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template #header>
            <h5 class="card-category">{{ $t("dashboard.dailySales") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-delivery-fast text-info"></i> 3,500€
            </h3>
          </template>
          <div class="chart-area">
            <bar-chart
              style="height: 100%"
              chart-id="blue-bar-chart"
              :chart-data="blueBarChart.chartData"
              :gradient-stops="blueBarChart.gradientStops"
              :extra-options="blueBarChart.extraOptions"
            >
            </bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{ 'text-right': isRTL }">
        <card type="chart">
          <template #header>
            <h5 class="card-category">{{ $t("dashboard.completedTasks") }}</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-send text-success"></i> 12,100K
            </h3>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              chart-id="green-line-chart"
              :chart-data="greenLineChart.chartData"
              :gradient-stops="greenLineChart.gradientStops"
              :extra-options="greenLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{ 'text-right': isRTL }">
          <template #header>
            <h6 class="title d-inline">
              {{ $t("dashboard.tasks", { count: 5 }) }}
            </h6>
            <p class="card-category d-inline">{{ $t("dashboard.today") }}</p>
            <base-dropdown
              menu-on-right=""
              tag="div"
              title-classes="btn btn-link btn-icon"
              aria-label="Settings menu"
              :class="{ 'float-left': isRTL }"
            >
              <template #title>
                <i class="tim-icons icon-settings-gear-63"></i>
              </template>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.action")
              }}</a>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.anotherAction")
              }}</a>
              <a class="dropdown-item" href="#pablo">{{
                $t("dashboard.dropdown.somethingElse")
              }}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{ 'text-right': isRTL }">
          <template #header>
            <h4 class="card-title">
              {{ $t("dashboard.simpleTable") }}
            </h4>
          </template>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
  },
  setup() {
    const i18n = useI18n();
    const route = useRoute();
    const bigChart = ref(null);

    const bigLineChart = ref({
      allData: [
        [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
        [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
        [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
      ],
      activeIndex: 0,
      chartData: {
        datasets: [{}],
        labels: [
          "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
        ],
      },
      extraOptions: chartConfigs.purpleChartOptions,
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0],
      categories: [],
    });

    const purpleLineChart = ref({
      extraOptions: chartConfigs.purpleChartOptions,
      chartData: {
        labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        datasets: [{
          label: "Data",
          fill: true,
          borderColor: config.colors.primary,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: config.colors.primary,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: config.colors.primary,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [80, 100, 70, 80, 120, 80],
        }],
      },
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.2, 0],
    });

    const greenLineChart = ref({
      extraOptions: chartConfigs.greenChartOptions,
      chartData: {
        labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
        datasets: [{
          label: "My First dataset",
          fill: true,
          borderColor: config.colors.danger,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: config.colors.danger,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: config.colors.danger,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [90, 27, 60, 12, 80],
        }],
      },
      gradientColors: [
        "rgba(66,134,121,0.15)",
        "rgba(66,134,121,0.0)",
        "rgba(66,134,121,0)",
      ],
      gradientStops: [1, 0.4, 0],
    });

    const blueBarChart = ref({
      extraOptions: chartConfigs.barChartOptions,
      chartData: {
        labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
        datasets: [{
          label: "Countries",
          fill: true,
          borderColor: config.colors.info,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45],
        }],
      },
      gradientColors: config.colors.primaryGradient,
      gradientStops: [1, 0.4, 0],
    });

    const enableRTL = computed(() => route.query.enableRTL);
    const isRTL = computed(() => i18n.rtl);
    const bigLineChartCategories = computed(() => i18n.t("dashboard.chartCategories"));

    const initBigChart = (index) => {
      let chartData = {
        datasets: [{
          fill: true,
          borderColor: config.colors.primary,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: config.colors.primary,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: config.colors.primary,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: bigLineChart.value.allData[index],
        }],
        labels: [
          "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
          "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
        ],
      };
      bigChart.value.updateGradients(chartData);
      bigLineChart.value.chartData = chartData;
      bigLineChart.value.activeIndex = index;
    };

    onMounted(() => {
      if (enableRTL.value) {
        i18n.locale = "ar";
        i18n.rtl = true;
      }
      initBigChart(0);
    });

    onBeforeUnmount(() => {
      if (i18n.rtl) {
        i18n.locale = "en";
        i18n.rtl = false;
      }
    });

    return {
      bigLineChart,
      purpleLineChart,
      greenLineChart,
      blueBarChart,
      enableRTL,
      isRTL,
      bigLineChartCategories,
      initBigChart,
      bigChart,
    };
  },
};
</script>
<style></style>
