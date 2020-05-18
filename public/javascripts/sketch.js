let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
    bestPhrase = createP("Best phrase:");
    bestPhrase.position(550,1130);
    bestPhrase.class("best");

    allPhrases = createP("All phrases:");
    allPhrases.position(980, 1100);
    allPhrases.class("all");

    stats = createP("Stats");
    stats.position(310,1280);
    stats.class("stats");

    //createCanvas(640, 360);
    target = "To be or not to be.";
    popmax = 200;
    mutationRate = 0.01;

    // Create a population with a target phrase, mutation rate, and population max
    population = new Population(target, mutationRate, popmax);
}

function draw() {

    population.naturalSelection();

    population.generate();

    population.calcFitness();

    population.evaluate();


    if (population.isFinished()) {
        //println(millis()/1000.0);
        noLoop();
    }

    displayInfo();
}

function displayInfo() {

    let answer = population.getBest();

    bestPhrase.html("Best phrase:<br>" + answer);

    let statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext += "total population:      " + popmax + "<br>";
    statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

    stats.html(statstext);

    allPhrases.html("All phrases:<br>" + population.allPhrases())
}