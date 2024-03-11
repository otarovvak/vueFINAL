<template>
  <div>
    <h1>{{ date }}.{{ month }}.{{ year }}</h1>
    <button class="button-35 pink-button" @click="openAddTaskModal">Добавить Задачу</button>
    <AddTaskModal v-if="showAddTaskModal" @task-added="addTask" @close="closeAddTaskModal" :date-id="dateId" />
    <div class="task-wrapper">
      <div v-for="task in tasks" :key="task.id" class="saveTask">
        <div>{{ task.title }}</div>
        <div>{{ task.startTime }} - {{ task.endTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddTaskModal from './AddTaskModal.vue';

interface Props {
  year: string;
  month: string;
  date: string;
}

interface Task {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

const props = defineProps<Props>();
const showAddTaskModal = ref(false);
const tasks = ref<Task[]>([]);
const dateId = ref<string>(`${props.year}-${props.month}-${props.date}`); 

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem(`tasks_${dateId.value}`);
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  }
};
loadTasksFromLocalStorage();

const openAddTaskModal = () => {
  showAddTaskModal.value = true;
};

const closeAddTaskModal = () => {
  showAddTaskModal.value = false;
};

const addTask = (task: Task) => {
  tasks.value.push(task);
  saveTasksToLocalStorage();
  window.location.reload();
};

const saveTasksToLocalStorage = () => {
  localStorage.setItem(`tasks_${dateId.value}`, JSON.stringify(tasks.value));
};
</script>

<style scoped>
.pink-button {
  background-color: pink;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.pink-button:hover {
  background-color: hotpink;
}
</style>
