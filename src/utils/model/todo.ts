import { TodoApi } from "@/utils/api/tods";
import { Model } from "@/utils/model/base";

interface todoData {
    id: number
    content: string
}

export class TodoModel extends Model {
    constructor() {
        super();
        this.api = new TodoApi();
    }

    clear(todoData) {
        return {
            id: todoData.id,
            task: todoData.content
        };
    }

    all() {
        // 平平无奇的代码
        let p = this.api.all();
        return p.then((todos: Array<todoData>) => {
            return todos.map(t => this.clear(t));
        });

        // 干人代码
        // return this.api.all().then(todos => todos.map(t => this.clear(t)))
    }
}
