import { TodoModel } from "@/utils/model/todo";

const log = console.log.bind(console);

interface updateTodo {
    task: string
}

export class TodoAction {
    public model: TodoModel;
    public todos: Array<todo>;

    constructor() {
        this.model = new TodoModel();
    }

    createTodo(todo) {
        return {
            id: todo.id,
            task: todo.task,
            edit: false,
            editContext: todo.task
        };
    }

    async load() {
        let todos = await this.model.all();
        log("load todos", todos);
        todos = await todos.map((todo) => {
            return this.createTodo(todo);
        });
        log("todos", todos);
        return todos;
    }

    async add(value: string) {
        let data = {
            task: value
        };
        let todo = await this.model.add(data);
        todo = this.createTodo(todo);
        return todo;

    }

    async delete(todoId: number) {
        await this.model.delete(todoId);
    }

    async update(todoId: number, updateTodo: updateTodo) {
        await this.model.update(todoId, updateTodo);
    }
}
