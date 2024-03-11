// routes.js
import Calendar from '../components/MonthTable.vue'
import DailyView from '../components/DayView.vue';

const routes = [
  {
    path: '/',
    component: Calendar,
  },
  {
    name: 'day', // The name of the route
    path: '/day/:year/:month/:date', // The URL path with dynamic segments for year, month, and date
    component: DailyView, // The component to render when this route is matched
    props: true // Enables passing route params as props to the component
  }
  
];

export default routes;
