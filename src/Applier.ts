import { AirConditioning } from "./AirConditioning";
import { Heater } from "./Heater";

export class Applier {
    constructor(private heater: Heater, private airCon: AirConditioning) {}

    apply(action: string) {
        switch (action) {
            case "Increase": {
                this.heater.turnOn(true);
                this.airCon.turnOn(false);
                break;
            }
            case "Decrease": {
                this.heater.turnOn(false);
                this.airCon.turnOn(true);
                break;
            }
            case "Stay": {
                this.heater.turnOn(false);
                this.airCon.turnOn(false);
                break;
            }
        }
    }
}
