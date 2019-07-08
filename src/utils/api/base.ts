import Fly from "flyio/dist/npm/wx";
import { map, merge } from "lodash";

const log = console.log.bind(console);

enum Method {
    get = "get",
    post = "post",
}

let fly = new Fly;

let cookies = {};
const HOST = "https://127.0.0.1:8000"; // 更改
//添加请求拦截器
fly.interceptors.request.use((request) => {
    //给所有请求添加自定义header
    request.headers["Cookie"] = map(cookies, (v, k) => k + "=" + v).join(";");
    //打印出请求体
    console.log("request", request);
    console.log("request.body", typeof (request.body));
    // if (request.method === "POST") {
    //     request.body = JSON.stringify(request.body);
    // }

    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        if (response.request.url.indexOf(HOST) == 0) {
            let hcks = response.headers["set-cookie"] || response.headers["Set-Cookie"];
            if (hcks != null) {
                hcks.forEach(v => {
                    let ck = v.split(";")[0].split("=");
                    cookies[ck[0]] = ck[1];
                });
            }
        }
        //只将请求结果的data字段返回
        return response.data;
    },
    (err) => {
        //发生网络错误后会走到这里
        //return Promise.resolve("ssss")
    }
);

function request(method: Method, url: string, data) {
    log("request params", method, url, data);
    return fly.request(url, data, {
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" }
    });
}

interface WxApiOpt<T> {
    success: (res: T) => void
    fail: (e: any) => void
}

function wxApiToPromise<T>(api: (a: WxApiOpt<T>) => void, arg1?): Promise<T> {
    return new Promise((resolve, reject) => {
        let opt = merge({
            success(r) {
                resolve(r);
            },
            fail(e) {
                reject(e);
            }
        }, arg1);
        api(opt);
    });
}

export class Api {
    baseUrl: string;

    constructor(baseUrl?: string) {
        log("构造函数 baseUrl", baseUrl);
        this.baseUrl = baseUrl || "http://localhost:8000/api";
    }

    get(path: string, data: object) {
        let url = this.baseUrl + path;
        console.log("get", url);
        return fly.get(url, data);
    }

    post(path: string, data: object) {
        let url = this.baseUrl + path;
        return fly.post(url, data);
    }
}

// export default Api


