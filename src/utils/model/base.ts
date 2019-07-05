import { TodoApi } from "@/utils/api/tods";
const log = console.log.bind(console)
export class Model extends TodoApi {
  add(data) {
    log('this', this)
  }

  all() {
    return
  }
}
