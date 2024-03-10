// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//       _                   _     _                                        _            
//      | | __ _ _   _  __ _| |__ (_)_ __   __ _ _ __ ___   __ _ _ __    __| | _____   __
//      | |/ _` | | | |/ _` | '_ \| | '_ \ / _` | '_ ` _ \ / _` | '_ \  / _` |/ _ \ \ / /
//      | | (_| | |_| | (_| | | | | | | | | (_| | | | | | | (_| | | | || (_| |  __/\ V / 
//      |_|\__,_|\__,_|\__, |_| |_|_|_| |_|\__, |_| |_| |_|\__,_|_| |_(_)__,_|\___| \_/  
//                     |___/               |___/                                         
//
//  Author: laughingman aka voodooEntity
//  Description: A simple example script to showcase entropy collection via javascript in the browser.
//  Version: 0.0.1
//  Hompage: laughingman.dev
//
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

class EntropyCollector {
    constructor(intEntropyAmount, updateCallback,finalCallback) {
        this.intEntropyAmount = intEntropyAmount;
        this.updateCallback = updateCallback;
        this.finalCallback = finalCallback;
        this.pool = [];
        this.interval = 20;
        this.count = 0;
    }

    run() {
        this.interval = 20;
        this.count = 0;
        this.eventCallback = (event) => {
            this.collect(event);
        };
        window.addEventListener("mousemove", this.eventCallback);
    }

    collect(event) {
        this.count++;
        if (this.count % this.interval != 0) {
            return;
        }
        // Get the current mouse position from the event object
        const { clientX: x, clientY: y } = event;

        const lastPosition = this.pool[this.pool.length - 1];
        if (!lastPosition || lastPosition[0] !== x && lastPosition[1] !== y) {
            this.pool.push(x * y);

            this.updateCallback(this.pool.length, this.intEntropyAmount);

            if (this.pool.length === this.intEntropyAmount) {
                window.removeEventListener('mousemove',this.eventCallback);
                this.finalCallback(this.pool);
                this.reset();
            }
        }
    }

    reset() {
        this.pool = [];
        this.count = 0;
    }

}

/**
 *
 * Example usage code:

 var entropyAmount = 42;
var updateCallback = function(poolLength, desiredAmount) {
    console.log("We are at " + poolLength + " of " + desiredAmount + " datasets");
};
var finalCallback = function(pool) {
    console.log("The reached the desired amount of datasets: ", pool);
    console.log(JSON.stringify(pool));
};
var ec = new EntropyCollector(entropyAmount, updateCallback, finalCallback);
ec.run();

 **/