<template>
  <div class="task-form-container" v-if="showModal">
    <div class="task-form">
      <h2>New Task</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-field">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="newTask.title" required>
        </div>
        <div class="form-field">
          <label for="startTime">Start:</label>
          <input type="time" id="startTime" v-model="newTask.startTime" required>
        </div>
        <div class="form-field">
          <label for="endTime">End:</label>
          <input type="time" id="endTime" v-model="newTask.endTime" required>
        </div>
        <div class="button-group">
          <button type="submit" class="pink-button">Create</button>
          <button type="button" @click="handleClose" class="pink-button">Close</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

interface Task {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}

const props = defineProps<{ dateId: string }>(); 

let tasks: Task[] = []; 
let nextId = 1; 

const newTask = ref<Task>({
  id: 0,
  title: '',
  startTime: '',
  endTime: ''
});
const showModal = ref(true);

const saveTasksToLocalStorage = () => {
  localStorage.setItem(`tasks_${props.dateId}`, JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem(`tasks_${props.dateId}`);
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
};

onMounted(() => {
  loadTasksFromLocalStorage();
});

const handleSubmit = () => {
  newTask.value.id = nextId++;
  tasks.push({ ...newTask.value });
  saveTasksToLocalStorage();
  newTask.value = {
    id: 0,
    title: '',
    startTime: '',
    endTime: ''
  };
  window.location.reload();
  showModal.value = false; 
};

const handleClose = () => {
  showModal.value = false;
};
</script>

<style scoped>
.task-form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.task-form {
  display: flex;
  flex-direction: column;
}

.form-field {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
}

.button-group {
  margin-top: 20px;
}

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
