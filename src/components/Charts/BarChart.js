import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  name: "bar-chart",
  components: { Bar },
  props: {
    extraOptions: Object,
    gradientColors: {
      type: Array,
      default: () => [
        "rgba(72,72,176,0.2)",
        "rgba(72,72,176,0.0)",
        "rgba(119,52,169,0)",
      ],
      validator: (val) => {
        return val.length > 2;
      },
    },
    gradientStops: {
      type: Array,
      default: () => [1, 0.4, 0],
      validator: (val) => {
        return val.length > 2;
      },
    },
  },
  setup(props) {
    const updateGradients = (chartData) => {
      if (!chartData) return;
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(props.gradientStops[0], props.gradientColors[0]);
      gradientStroke.addColorStop(props.gradientStops[1], props.gradientColors[1]);
      gradientStroke.addColorStop(props.gradientStops[2], props.gradientColors[2]);

      chartData.datasets.forEach((set) => {
        set.backgroundColor = gradientStroke;
      });
    };

    return { updateGradients };
  },
};
