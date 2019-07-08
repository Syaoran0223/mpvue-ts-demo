<template>
    <div class="counter-warp">
        <!--<a :href="AppUrls.INDEX" class="home">去往首页</a>-->
        <!--<div>-->
        <!--这里是todo页面-->
        <!--</div>-->
        <div class="todo-input">
            <input class="todo-input-input" v-model="input"></input>
            <button class="todo-input-button" @click="add">add</button>
        </div>
        <div v-for="(todo, index) in todos" :key="index" v-if="todos.length > 0">
            {{todo.edit}} {{todo.task}}
            <div v-if="todo.edit === true">
                <input class="todo-input-input" v-model="todo.editContext"></input>
            </div>
            <div v-if="todo.edit === false">
                {{todo.id}}: {{todo.task}}
            </div>
            <button @click="editTodo(index)">edit</button>
            <button @click="editConfirm(index)" v-if="todo.edit === true">editConfirm</button>
            <button @click="deleteTodo(todo.id)">delete</button>
        </div>
    </div>
</template>

<script lang="ts" src="./todo.ts">
</script>

<style>
    .counter-warp {
        text-align: center;
        margin-top: 100px;
    }

    .home {
        display: inline-block;
        margin: 100px auto;
        padding: 5px 10px;
        color: blue;
        border: 1px solid blue;
    }

    .todo-input {
        display: flex;
    }

    .todo-input-input {
        outline: 1px solid black;
        height: 50px;
    }

    .todo-input-button {
        height: 50px;
    }
</style>
