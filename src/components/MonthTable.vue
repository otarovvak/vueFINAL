<template>
  <div class="calendar">
    <table class="calendar-table">
      <thead>
        <tr>
          <th :colspan="weekdays.length + 1" class="month-name">{{ currentMonth }}</th>
        </tr>
        <tr>
          <th v-for="day in weekdays" :key="day" class="week-day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="week.date" class="week">
          <td v-for="day in week.days" :key="day.date" class="day">
            <router-link :to="{ name: 'day', params: { year: currentYear, month: currentMonthNum, date: parseInt(day.date.split('-')[2]) } }" class="day-link">
              {{ day.date.split('-')[2] }}
            </router-link>
            <span v-if="day.notifications" class="day-notifications">({{ day.notifications }})</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

export interface CalendarDay {
  date: string;
  notifications?: number; 
  link?: string;
}

export interface CalendarWeek {
  date: string; 
  days: CalendarDay[];
}

async function getMonthCalendarData(year: number, month: number): Promise<CalendarWeek[]> {
  const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
  const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;

  const days: CalendarDay[] = [];
  let currentDate = new Date(startDate);
  while (currentDate.getMonth() === month - 1) {
    const dateString = currentDate.toISOString().slice(0, 10);
    days.push({ date: dateString });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const weeks: CalendarWeek[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({ date: days[i].date, days: days.slice(i, i + 7) });
  }

  return weeks;
}

export default {
  components: {
    RouterLink
  },
  setup() {
    const weekdays = ref<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    const weeks = ref<CalendarWeek[]>([]);
    const currentMonth = ref('');
    const currentYear = ref(new Date().getFullYear());
    const currentMonthNum = ref(new Date().getMonth() + 1);

    onMounted(async () => {
      const monthData = await getMonthCalendarData(currentYear.value, currentMonthNum.value);
      weeks.value = monthData;
      currentMonth.value = new Date(monthData[0].date).toLocaleDateString('en-US', { month: 'long' });
    });

    return { weekdays, weeks, currentMonth, currentYear, currentMonthNum };
  }
}
</script>

<style scoped>
.calendar {
  width: 100%;
  border-collapse: collapse;
}

.calendar-table {
  width: 100%;
  border: 1px solid #ddd;
}

.month-name {
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
  background-color: #f1f1f1;
}

.week-day,
.day {
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.week-day {
  background-color: #f1f1f1;
  font-weight: bold;
}

.day-link {
  text-decoration: none;
  color: black;
}

.day-notifications {
  font-size: 10px;
  color: #999;
}
</style>
