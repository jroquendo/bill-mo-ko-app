
import config from "../config.json";

export default class ConfigService {

    private baseApiUrl: String;

    constructor(){}

    public getBaseApiUrl(){
        return config.public.apiBaseURL;
    }

}