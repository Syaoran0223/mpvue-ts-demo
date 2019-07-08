import { TodoApi } from "@/utils/api/tods";

const log = console.log.bind(console);

export class Model {
    api: TodoApi;

    add(data) {
        console.log("this.data", data);
        return this.api.add(data);
    }

    all() {
        // 洗数据放在 model 层, 保证 view 拿到的是可以直接用的数据
        // 直接让子类重写 all 方法
        return this.api.all();
    }

    delete(todoId) {
        return this.api.delete(todoId);
    }

    update(id, data) {
        return this.api.update(id, data);
    }
}
