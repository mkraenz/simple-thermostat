import { readFile } from "fs/promises";
import { isEmpty } from "lodash";
import * as moment from "moment";

interface WeatherData {
    type: "Feature";
    geometry: { type: "Point"; coordinates: [number, number, number] };
    properties: {
        parameter: {
            T2M: { [dateHour: string]: number }; // Temperature at 2 Meters in Celsius
        };
    };
}

interface TemperaturePoint {
    time: Date;
    temperature: number;
}

export class Thermometer {
    private temperatureByHour: TemperaturePoint[] = [];
    private currentTimeIndex: number = 0;

    async init() {
        const inputFilepath = "./db.json";
        const dateHourFormat = "YYYYMMDDHH";

        const file = await readFile(inputFilepath);
        const data: WeatherData = JSON.parse(file.toString());
        const temperatureByHour: TemperaturePoint[] = Object.entries(
            data.properties.parameter.T2M
        ).map(([dateHour, temperature]) => {
            const time = moment(dateHour, dateHourFormat).toDate();
            return { time, temperature };
        });

        this.temperatureByHour = temperatureByHour;
    }

    public next(): TemperaturePoint | undefined {
        if (isEmpty(this.temperatureByHour))
            throw new Error(
                "SetupError. Did you call .init() before calling .next()?"
            );

        const nextTemp = this.temperatureByHour[this.currentTimeIndex];
        this.currentTimeIndex = this.currentTimeIndex + 1;
        return nextTemp;
    }
}
