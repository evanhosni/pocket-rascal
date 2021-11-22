// when a user creates a new account - aka a post request rather than a get if they log in - redirects to this page which creates and initializes a rascal 


//initialize the rascal 

const initialAge = 0;
const initialHappiness = 75;
const initialHunger = 50;
const initialAttention = 75;
const initialEnergy = 75;

const maxHappiness = 100;
const maxHunger = 100;
const maxAttention = 100;
const maxEnergy = 100;

function chooseBody() {
    const bodyOptions = ['./assets/body.png']
    //add in additional body types once they are created

    var selectedBody = bodyOptions[Math.floor(Math.random() * bodyOptions.length)]

    return selectedBody
}

function newRascal(name) {
    //actually initialize the rascal - create an object that contains properties that belong to the rascal like name, ect 
    this.name = name;
    this.age = initialAge;
    this.happiness = initialHappiness;
    this.hunger = initialHunger;
    this.attention = initialAttention;
    this.energy = initialEnergy;
    this.body = chooseBody();
    this.attributes = [];
    this.items = [];
}

function rascalStatus() {
    //interval to reduce meters over time
    //thought bubble pop ups if those meters hit a specific value
}

const isAlive = function () {
    if (happiness > 0 && attention > 0 && energy > 0 && hunger < 100){
        return true }
    else {return false}
}

const feedRascal = function () {

    //when you feed the rascal -- hunger decreases 
    //based on type of food you choose or is this consistent? 

    //updateHappiness function called here?

}

const petRascal = function () {

    //pet rascal -- increases the attention by 5 pts 

    //which is passed onto happiness to increase it 

}

function overallHappiness () {
    //if hunger decreases by 5 -- happiness increases by 2
    //once hunger decreases by 5 -- happiness decreases by 2

    // if attention increases by 5 -- happiness increases by 2
    // once attention decreases by 5 -- happiness decreases by 2

    // 
}

function logOnUpdate(rascal) {
    if(user.session) {
    rascal.age = (age+1)

    }
}


