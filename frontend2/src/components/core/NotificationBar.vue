<template>
<div>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
  <v-snackbar v-model="snackbar" :color="notificationColor">
    {{ notification.message }}
    <v-btn dark text @click="snackbar = false">Fechar</v-btn>
  </v-snackbar>


</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null,
      snackbar: true
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    },
    notificationColor() {
      return this.notification.type
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>
