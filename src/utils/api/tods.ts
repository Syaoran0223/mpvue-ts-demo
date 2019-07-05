import { Api } from "@/utils/api/base";

export class TodoApi extends Api {
  baseUrl: string;

  constructor(url: string) {
    super(url);
    this.baseUrl = url || "http://localhost:800/api/todo";
  }

  all() {
    let path = "/all";
    return this.get(path, {});
  }

  add(data) {
    let path: string = "./add";
    return this.post(path, data);
  }

  delete(todoId) {
    let path: string = "/delete/" + todoId;
    return this.get(path, {});
  }

  update(todoId: number, data: object) {
    let path: string = "/update/" + todoId;
    return this.post(path, data);
  }
}
