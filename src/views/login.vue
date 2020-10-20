<template>
  <div>
    <h1>Login</h1>

    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>

    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
    </div>

    <div>
      <button @click.prevent="login()">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/auth/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.$store.commit("setUser", response.data);
          this.$router.push("/");
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
