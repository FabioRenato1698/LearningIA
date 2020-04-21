class Population {
    constructor(p, m, num) {
  
      this.population; // Array para guardar a população actual
      this.matingPool; // ArrayList na qual usarei para a "mating pool"
      this.generations = 0; // Numero de gerações
      this.finished = false; // Já acabamos de evoluir?
      this.target = p; // frase alvo
      this.mutationRate = m; // Mutation rate
      this.perfectScore = 1;
  
      this.best = "";
  
      this.population = [];
      for (let i = 0; i < num; i++) {
        this.population[i] = new DNA(this.target.length);
      }
      this.matingPool = [];
      this.calcFitness();
    }
  
    // Fill our fitness array with a value for every member of the population
    calcFitness() {
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].calcFitness(target);
      }
    }
  
    naturalSelection() {
      
      this.matingPool = [];
  
      let maxFitness = 0;
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > maxFitness) {
          maxFitness = this.population[i].fitness;
        }
      }
  
      
      for (let i = 0; i < this.population.length; i++) {
  
        let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
        let n = floor(fitness * 100); 
        for (let j = 0; j < n; j++) { 
          this.matingPool.push(this.population[i]);
        }
      }
    }
  
    // Criar uma nova geração
    generate() {
      
      for (let i = 0; i < this.population.length; i++) {
        let a = floor(random(this.matingPool.length));
        let b = floor(random(this.matingPool.length));
        let partnerA = this.matingPool[a];
        let partnerB = this.matingPool[b];
        let child = partnerA.crossover(partnerB);
        child.mutate(this.mutationRate);
        this.population[i] = child;
      }
      this.generations++;
    }
  
  
    getBest() {
      return this.best;
    }
  
    
    evaluate() {
      let worldrecord = 0.0;
      let index = 0;
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].fitness > worldrecord) {
          index = i;
          worldrecord = this.population[i].fitness;
        }
      }
  
      this.best = this.population[index].getPhrase();
      if (worldrecord === this.perfectScore) {
        this.finished = true;
      }
    }
  
    isFinished() {
      return this.finished;
    }
  
    getGenerations() {
      return this.generations;
    }
  
    
    getAverageFitness() {
      let total = 0;
      for (let i = 0; i < this.population.length; i++) {
        total += this.population[i].fitness;
      }
      return total / (this.population.length);
    }
  
    allPhrases() {
      let everything = "";
  
      let displayLimit = min(this.population.length, 15);
  
  
      for (let i = 0; i < displayLimit; i++) {
        everything += this.population[i].getPhrase() + "<br>";
      }
      return everything;
    }
}