export class Permiso {
    constructor(_id = '', day = '', star_time = '', end_time = '', rol = 'string', state = true) {
        this._id = _id;
        this.day = day;
        this.start_time = star_time;
        this.end_time = end_time;
        this.rol = rol;
        this.state = state;
    }

    _id: string;
    day: string;
    start_time: string;
    end_time: string;
    rol: string;
    state: boolean;
}
