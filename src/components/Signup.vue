<template>
  <div class="signup">
    <h2>サインアップ</h2>
    <!-- 登録フォーム -->
    <input type="email" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button @click="signUp">登録</button>

    <!-- サインインへの遷移ボタン -->
    <p>
      アカウントをすでにお持ちの方
      <router-link to="/signin">sign in now</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase" // firebaseのインポート

export default {
  name: "Singup",
  data() {
    return {
      // email, password の初期値を設定
      email: "",
      password: ""
    };
  },
  methods: {
    // singUpボタンが押されたときに実行されるfunctrion
    signUp: async function() {
      try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        alert(`アカウントを作成しました: ${res.user.email}`)
      } catch(e) {
        if (e.code === 'auth/email-already-in-use') {
          alert('入力されたメールアドレスは既に使用されています。')
        }
      }
    }
  }
}
</script>

<style>
</style>
