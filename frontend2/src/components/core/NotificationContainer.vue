<template>
  <div>
    <NotificationBar v-for="notification in notifications" :key="notification.id" :notification="notification"/>
  </div>
</template>

<script>
import NotificationBar from '@/components/core/NotificationBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'notification-container',
  components: {
    NotificationBar
  },
  computed: mapState('notification', ['notifications'])
}
</script>
