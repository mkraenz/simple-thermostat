export class AirConditioning {
    private on: boolean = false;

    turnOn(value: boolean) {
        console.log("aircon on: ", value);
        this.on = value;
    }
}
