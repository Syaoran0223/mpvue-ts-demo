const pre = "/pages";
export const AppUrls = {
    INDEX: pre + "/index/main",
    COUNTER: pre + "/counter/main",
    PACKAGE_A: "/packageA/pages/index/main",
    EXAMPAPER: pre + "/examPaper/main",
    TODO: pre + "/todo/main"
};

export class Model {
    username: string;
    height: number;
    weight: number;
    props;

    constructor(username: string) {
        this.username = username;
    }

}

