<template>
  <div class="task">
     <h2>タスク</h2>
    <div>
      <input type="text" v-model="newTodoName">
      <button type="submit" @click="createTodo()">タスク作成</button>
    </div>
    <ul>
      <li><button type="submit" @click="showTodoType = 'all'">すべて</button></li>
      <li><button type="submit" @click="showTodoType = 'active'">未完タスク一覧</button></li>
      <li><button type="submit" @click="showTodoType = 'complete'">完了タスク一覧</button></li>
    </ul>
    <!-- todoの一覧表示 -->
    <ul v-for="(todo, key) in filteredTodos" :key="todo.id">
      <li><input class="toggle" type="checkbox" v-model="todo.isComplete" @click="updateIsCompleteTodo(todo, key)">{{ todo.name }}</li>
      <button type="submit" @click="deleteTodo(key)">削除</button>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  name: "Task",
  data() {
    return {
      database: null,
      todosRef: null,
      newTodoName: "",
      showTodoType: "all",
      todos: []
    }
  },
  created: function() {
    this.database = firebase.database()
    this.uid = firebase.auth().currentUser.uid
    this.todosRef = this.database.ref("todos/" + this.uid)

    // データに変更があると実行されるfunction
    this.todosRef.on("value", (snapshot) => {
      this.todos = snapshot.val() // 再取得してtodosに格納する
    })
  },
  computed: {
    // フィルターの実装showTodoTypeが変更されると実行される
    filteredTodos: function() {
      if (this.showTodoType == "all") {
        return this.todos
      } else {
        let showIsComplete = false
        if (this.showTodoType == "complete") {
          showIsComplete = true
        }
        let filterTodos = {}
        for (let key in this.todos) {
          let todo = this.todos[key]
          if (todo.isComplete == showIsComplete) {
            filterTodos[key] = todo
          }
        }
        return filterTodos
      }
    }
  },
  methods: {
    // DBのtodos/[uid]/以下にデータを格納していく
    createTodo: function() {
      if (this.newTodoName == "") {
        return
      }
      this.todosRef.push({
        name: this.newTodoName,
        isComplete: false
      })
      this.newTodoName = ""
    },
    // 完了・未完了の値の更新
    updateIsCompleteTodo: function(todo, key) {
      todo.isComplete = !todo.isComplete
      const updates = {}
      updates[key] = todo
      this.todosRef.update(updates)
    },
    // todoの削除
    deleteTodo: function(key) {
      this.todosRef.child(key).remove()
    }
  }
}
</script>

<style>
</style>
