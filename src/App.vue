<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Vue-Do</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/">Tasks</b-nav-item>
          <b-nav-item href="#/bin">Bin</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br>
    <component
      :is="currentView"
      :tasks="tasks"
      :recycleBin="recycleBin"
      @add-task="addTask"
      @delete-task="deleteTask"
      @update-task="updateTask"
      @restore-task="restoreTask"
      @delete-permanently="deletePermanently"
    />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import RecycleBin from './components/RecycleBin.vue';
import axios from 'axios';

const routes = {
  '/': TaskList,
  '/bin': RecycleBin
};

export default {
  components: {
    TaskList,
    RecycleBin,
  },
  data() {
    return {
      currentPath: window.location.hash,
      tasks: [],
      recycleBin: [],
      newTask: '',
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'];
    }
  },
  mounted() {
    this.fetchTasks();
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash;
    });
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/');
        if (Array.isArray(response.data)) {
          this.tasks = response.data;
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask(task) {
      try {
        const response = await axios.post('http://localhost:3000/addtask', task);
        if (response.data.success) {
          this.tasks.push(task);
        } else {
          console.error('Error adding task:', response.data.message);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async deleteTask(index) {
      const task = this.tasks[index];
      try {
        this.recycleBin.push(task);
        await axios.delete(`http://localhost:3000/${task.id}`);
        this.tasks.splice(index, 1);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    async updateTask(id) {
      try {
        const response = await axios.put(`http://localhost:3000/${id}`);
        if (response.data.success) {
          const index = this.tasks.findIndex(task => task.id === id);
          if (index !== -1) {
            this.$set(this.tasks, index, response.data.task);
          }
        } else {
          console.error('Error updating task:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    restoreTask(index) {
      const task = this.recycleBin.splice(index, 1)[0];
      this.tasks.push(task);
    },
    deletePermanently(index) {
      this.recycleBin.splice(index, 1);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
</style>
