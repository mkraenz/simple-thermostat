import { AirConditioning } from "./AirConditioning";
import { Applier } from "./Applier";
import { ThermostatCommander as Decider } from "./Decider";
import { Heater } from "./Heater";
import { Thermometer } from "./Thermometer";

const main = async () => {
    console.log("Running...");

    const sensor = new Thermometer();
    await sensor.init();
    const decider = new Decider(5, 2);
    const heater = new Heater();
    const airCon = new AirConditioning();
    const applier = new Applier(heater, airCon);
    let currentTemperaturePoint = sensor.next();

    while (currentTemperaturePoint) {
        const action = decider.getNextAction(
            currentTemperaturePoint.temperature
        );
        console.log(currentTemperaturePoint.temperature, action);
        applier.apply(action);

        // simulate passing time
        currentTemperaturePoint = sensor.next();
    }

    console.log("Finished.");
};

main();
