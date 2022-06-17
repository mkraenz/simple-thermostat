export class Heater {
    private on: boolean = false;

    turnOn(value: boolean) {
        console.log("heater on: ", value);
        this.on = value;
    }
}
