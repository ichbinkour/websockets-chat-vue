<template>
  <div>
    <div v-for="room in rooms" :key="room.id">
      <button @click="joinRoom(room)" href="">{{ room.name }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      rooms: []
    };
  },
  created() {
    this.$axios
      .get("rooms/list")
      .then(response => {
        this.rooms = response.data.rooms;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    joinRoom(room) {
      this.$router.push(`/room/${room._id}`);
    }
  }
};
</script>
