<template>
  <b-container>
    <b-row>
      <b-col>
        <h2 class="text-center">Recycle Bin</h2>
        <b-card-group deck>
          <b-card v-for="(task, index) in recycleBin" :key="task.id" class="mb-3" bg-variant="warning">
            <b-card-text>{{ task.name }}</b-card-text>
            <b-button variant="success" @click="restoreTask(index)">Restore</b-button>
            <b-button variant="danger" @click="deletePermanently(index)">Delete Permanently</b-button>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ['recycleBin'],
  methods: {
    restoreTask(index) {
      this.$emit('restore-task', index);
    },
    deletePermanently(index) {
      this.$emit('delete-permanently', index);
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
