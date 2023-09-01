
export class UserModel {
    id: number;
    username: string;
    token: string | null;

    constructor(id: number, username: string, token: string | null = null) {
        this.id = id;
        this.username = username;
        this.token = token;
    }
}
