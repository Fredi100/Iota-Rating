export class Booth {

    seed: string;
    name: string;
    rating: number;

    constructor(seed: string, name: string, rating = 0){
        this.seed = seed;
        this.name = name;
        this.rating = rating;
    }

}
