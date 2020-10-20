<template>
  <div>
    <h1>Room</h1>
    <div style="overflow: auto; max-height: 500px; background: gray">
      <p v-for="message in messages" :key="message.id">
        [{{ message.author.username }}]: {{ message.message }}
      </p>
    </div>
    <div>
      <input type="text" v-model="currentMessage" />
      <button @click.prevent="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Room",
  data() {
    return {
      messages: [],
      currentMessage: "",
    };
  },
  sockets: {},
  methods: {
    sendMessage() {
      this.$axios
        .post(
          "messages/create",
          {
            message: this.currentMessage,
            roomId: this.$route.params.id,
          },
          {
            headers: {
              authorization: `Bearer ${this.$store.state.user.access_token}`,
            },
          }
        )
        .then((response) => {
          this.currentMessage = "";
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.$axios
      .get("messages/list", {
        params: {
          roomId: this.$route.params.id,
        },
        headers: {
          authorization: `Bearer ${this.$store.state.user.access_token}`,
        },
      })
      .then((response) => {
        this.messages = response.data.messages;
      })
      .catch((e) => {
        console.log(e);
      });

    this.$socket.emit("joinRoom", {
      user: this.$store.state.user.username,
      room: this.$route.params.id,
    });

    this.$options.sockets.onNewMessage = (data) => {
      this.messages.push(data);
    };
  },
};
</script>
