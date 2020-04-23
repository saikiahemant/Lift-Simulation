{
    'use strict';

    class Building {
        constructor() {
            this.lifts = []
            this.floors = []
        }
    }
    class Lift {
        constructor(id, floor) {
            this.id = id
            this.curr_floor = floor
        }
    }
    class Floor {
        constructor(id, lifts) {
            this.id = id
            this.listOfLifts = lifts
        }
    }

    const Data = {
        allLifts: [],
        allFloors: [],
        tabSelected: 'add-new-tab',
        liftMap: {},
        heightOfBuilding: 450,
        maxHeightOfFloor: 100,
        widthOfBuilding: 500,
        maxWidthOfLift: 60
    }

    const DOMStrings = {
        noOfFloors: document.querySelector("#no-of-floors"),
        noOfLifts: document.querySelector("#no-of-lift"),
        spawnBtn: document.querySelector("#generate-button"),
        building: document.querySelector(".building"),
        floors: document.querySelectorAll(".floor")
    };

    const ControlMethods = {
        buildBuilding: (noOfFloors, noOfLifts) => {

            DOMStrings.building.innerHTML = "";
            heightOfEachFloor = Math.min(Math.floor(Data.heightOfBuilding / noOfFloors), Data.maxHeightOfFloor);
            heightOfEachLift = heightOfEachFloor;
            widthOfEachLift = Math.min(Math.floor(Data.heightOfBuilding / noOfLifts), Data.maxWidthOfLift);

            console.log(heightOfEachFloor, heightOfEachLift, widthOfEachLift);

            let floor_id = "";
            for (let floor = 0; floor < noOfFloors; floor++) {
                floor_id = "floor_" + floor;
                ControlMethods.addFloor(floor_id, heightOfEachFloor);
            }

            for (let floor = 0; floor < noOfFloors; floor++) {
                floor_id = "floor_" + floor;
                let htmlFLoor = document.querySelector("#"+floor_id);
                console.log(htmlFLoor);
                htmlFLoor.addEventListener('click', (e) => {
                    console.log("Aquaman");
                    ControlMethods.moveLift(e.target);
                });
            }
            
            let groundFloor = document.querySelector("#" + floor_id);
            for (let lift = 0; lift < noOfLifts; lift++) {
                lift_id = "lift_" + lift;
                ControlMethods.addLift(lift_id, groundFloor, heightOfEachLift, widthOfEachLift);
            }
        },

        addFloor: (floor_id, heightOfEachFloor) => {
            let floorObject = new Floor(floor_id, null);
            DOMStrings.building.innerHTML += "<div class=\"floor\" id=" + floorObject.id + "> </div>";
            let htmlFloor = document.querySelector("#" + floor_id);
            htmlFloor.style.height = heightOfEachFloor;
        },

        addLift: (lift_id, groundFloor, heightOfEachLift, widthOfEachLift) => {
            let liftObject = new Lift(lift_id, groundFloor);

            groundFloor.innerHTML += "<div class=\"lift\" id=" + lift_id + "> </div>";

            Data.liftMap[lift_id] = groundFloor;

            let liftDOM = document.querySelector("#" + lift_id);
            liftDOM.style.width = widthOfEachLift;
            liftDOM.style.height = heightOfEachLift;
        },

        moveLift: (target) => {
            let lift_id = "lift_0";
            source = Data.liftMap[lift_id]
            liftss = source.innerHTML;
            source.innerHTML = "";
            target.innerHTML += liftss;

            Data.liftMap[lift_id] = target;
        }
    }


    DOMStrings.spawnBtn.addEventListener('click', (e) => {
        let noOfFloors = DOMStrings.noOfFloors.value;
        let noOfLifts = DOMStrings.noOfLifts.value;
        ControlMethods.buildBuilding(noOfFloors, noOfLifts);
    });

}
