<template>
  <div id="signin">
    <h2>サインイン</h2>
    <!-- emailとpasswordの入力欄 -->
    <input type="email" placeholder="email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="signIn">Signin</button>
    <!-- サインアップページ遷移ボタン -->
    <p>
      アカウントをお持ちではない方
      <router-link to="/signup">新規作成</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase" // firebaseのインポート

export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    // signinボタンを押したときに実行されるfunction
    signIn: async function() {
      try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
      alert(`ログインしました： ${res.user.email}`)
      this.$router.push("/")
      } catch (error) {
        alert(error.message)
      }
    }
  }
};
</script>


<style>
</style>
