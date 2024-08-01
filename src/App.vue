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
    <component :is="currentView"
               :tasks="tasks"
               :recycleBin="recycleBin"
               @add-task="addTask"
               @delete-task="deleteTask"
               @restore-task="restoreTask"
               @delete-permanently="deletePermanently" />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import RecycleBin from './components/RecycleBin.vue';

const routes = {
  '/': TaskList,
  '/bin': RecycleBin
}

export default {
  components: {
    TaskList,
    RecycleBin,
  },
  data() {
    return {
      currentPath: window.location.hash,
      tasks: [],
      recycleBin: []
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/']
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  },
  methods: {
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(index) {
      const task = this.tasks.splice(index, 1)[0];
      this.recycleBin.push(task);
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
