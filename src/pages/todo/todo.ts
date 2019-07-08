import { Component, Emit, Vue } from "vue-property-decorator";
import { AppUrls } from "@/utils/consts.ts";
// Use Vuex
import store from "./store";
import { TodoAction } from "@/utils/action/todo";

const debug = require("debug")("log:Page/Todo");
const todoAction = new TodoAction();
const log = console.log.bind(console);
@Component
export default class Todo extends Vue {
    AppUrls = AppUrls;
    todos: any = [];
    input: string;
    todosEditMap: Array<string> = [];

    async add() {
        let todo = await todoAction.add(this.input);
        log("add todo", todo);
        this.todos.push(todo);
    }

    async onShow() {
        this.todos = await todoAction.load();
        log("当前的todos", this.todos);
    }

    async deleteTodo(id: number) {
        await todoAction.delete(id);
        let index = this.todos.findIndex((todo) => {
            return todo.id === id;
        });
        this.todos.splice(index, 1);
    }

    async editTodo(index: number) {
        this.todos[index].edit = !this.todos[index].edit;
        if (this.todos[index].edit === false) {
            this.todos[index].editContext = this.todos[index].task;
        }
    }

    async editConfirm(index: number) {
        if (this.todos[index].edit === true) {
            await this.updateTodo(index);
            this.todos[index].task = this.todos[index].editContext;
            this.todos[index].edit = !this.todos[index].edit;
        }
    }

    async updateTodo(index: number) {
        let todoId = this.todos[index].id;
        let data = {
            task: this.todos[index].editContext
        };
        await todoAction.update(todoId, data);
    }
}
