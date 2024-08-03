<template>
  <b-container>
    <b-row>
      <b-col>
        <h2 class="text-center">Task List</h2>
        <b-input-group class="mb-3">
          <b-form-input v-model="inputValue" @keyup.enter="addTask" placeholder="Search or Add a new task"></b-form-input>
          <b-input-group-append>
            <b-button variant="primary" @click="addTask">Add Task</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-card-group deck>
          <b-card v-for="(task, index) in filteredTasks" :key="task.id" class="mb-3" bg-variant="light">
            <b-form-input v-model="task.name" class="mb-2"></b-form-input>
            <b-button variant="success" @click="updateTask(task)">Update</b-button>
            <b-button variant="danger" @click="deleteTask(index)">Delete</b-button>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ['tasks'],
  data() {
    return {
      id: 0,
      inputValue: ''
    };
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(
        (task) => task.name.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    }
  },
  methods: {
    addTask() {
      if (this.inputValue.trim()) {
        this.$emit('add-task', {
          id: this.id++,
          name: this.inputValue.trim(),
        });
        this.inputValue = '';
      }
    },
    deleteTask(index) {
      this.$emit('delete-task', index);
    },
    updateTask(task) {
      this.$emit('update-task', task.id, task.name);
    }
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.mb-3 {
  margin-bottom: 1rem;
}
</style>
