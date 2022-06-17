export class ThermostatCommander {
    constructor(
        private targetTemperature: number,
        private toleranceInCelsius: number
    ) {}

    getNextAction(temperature: number) {
        if (temperature < this.targetTemperature - this.toleranceInCelsius)
            return "Increase";
        if (temperature > this.targetTemperature + this.toleranceInCelsius)
            return "Decrease";
        return "Stay";
    }
}
