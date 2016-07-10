# The Nature of Code

## Table of content
- [Session 2, Vectors](#session2)
- [Session 3, Steering Behaviors](#id-session3)
- [Session 4, Fractals](#id-session4)
- [Session 5, Genetic Algorithms](#session5)

## Session 2, Vectors <a name="session2"></a>
When using various .js files, UPDATE index.html !!! Every .js file should go before the script.js one.

1. *Physics engine* (acceleration, gravity, friction, etc) Force: Newton's Laws (2nd law) > Vector that causes a mass object to accelerate
F=m*a => a=F/m (if m=1) => a=F
2. function applyForce is EXTERNAL!
3. To add another force, accelerations must add each force, but must be reset before the following frame!

## Session 3, Steering Behaviors
>Simulating AUTONOMOUS AGENTS (acting = moving), being a live, active thing. 3 principles:
1. Limited! ability to perceive it's environment (within a certain distance, or LoS > design decisions)
2. What it does with that perception? > Executes an action (force)
3. They have no leader, they act on their own

They have a certain BEHAVIOR, and a lot of "vehicles" moving on their own can make really complex systems. (Steering behaviors for autonomous characters, paper in session resources)

3 steps:
1. **Action Selection**: A vehicle has a goal, and decides to take an action to reach that goal (desire) > CRITICAL STEP!
2. **Steering**: Force calculation! > steering = desired-velocity
3. Locomotion: How it moves across the canvas (motion animation!)

Steering force formula: steering = desired(?) - velocity;
steering is a force vector that "steers" the object towards the desired location. If it's at a certain distance, the vehicle should slow down! so the steering force now is opposite to the current direction so the vehicle decelerates.

- Flow field following (campo de vectores) > desired = vector in that point of the field (2D array)
- Group behavior, Separation: checks the distance to every other object, and whenever an object is within a certain tolerance threshold, it's desired vel is to move in the opposite direction

A system is more than the sum of its parts; has 3 principles:
1. The units have short-range relationships (can only see the ones nearby, LIMITED PERCEPTION)
2. Units operate in parallel! With each cycle, each unit decides how to operate to simulate the parallel
3. Complex, intelligent and parallel behavior appears. Flocking (boid ~ bird), 3 steering behavior: separation, cohesion (~inverse of separation), alignment (of velocities).

<div id='id-session4'/>
## Session 4, Fractals
Before: Motion and animation on the screen. Fractals: Patterns and how to generate them. But we can integrate them in the work we've already done

> Fractal, a rough nature or fragmented geometric shape, that can be split into parts, each of which -at least approximately- is a reduced size copy of the whole.
Ex: Mandelbrot tree, stock market data (:O statistically similar)
SELF SIMILARITY is key, but not sufficient
RECURSIVE definition (we will use this in code) -> needs exit condition!

Recursion with transformations (translate, rotate, scale) -> push & pop! we have to come back to the previous step, otherwise it's a mess.

Recursion with arrays -> so we can have the tree grow, have leaves and make the leaves fall. Elements in arrays clone themselves in the array and add the following objects.

<div id='id-session5'/>
## Session 5, Genetic Algorithms
We use *variables* and *objects* all the time. Can objects make other objects and pass their "DNA" to new objects? Evolve objects -> Develop objects based on Darwinian evolution. Mainly developed by John Holland (University of Michigan) in his book *Adaptation in natural and artificial systems, 1975*.

> Genetic Algorithm (we're looking for creative applications) 3 categories:
1. *Traditional gen. algorithm*, thought for problems, where the solution is so vast that a brute force approach would take too long. Takes clues from it's performance to get better, to "evolve" your solution.
2. *Interactive solution*, applied in visual arts. Algorithmically generated visual art evolves according to user feedback.
<!-- 3. *Ecosystem simulation*, function that determines the fitness of members. Their behavior or appearance evolves in a natural way. -->

A problem that can't be solved with brute force: Shakespeare Monkey problem. If we can test against a known solution, we can be sure the algorithm works.

> Elements needed for Genetic Algorithms:
1. **Heredity**, a process where traits are passed down to their children.
2. **Variation**, there has to be a way by which variation is introduced to the population.
3. **Selection**, there has to be a method by which some individuals can reproduce and others cannot. "Survival of the fittest". Some traits are better suited for a certain environment.

Genetic Algorithm can be separated in two parts: Creating/Initializing population (setup) and Selection/Fitness evaluation (draw).
1. *Creation*, 100 creatures (randomly?) -> it has variation
2. *Selection*, evaluates and only the fittest have offspring
  1. Fitness function -> gives each creatures a score according to its performance.
  2. Selection -> probability values, how likely is the creature to be picked to pass their genes (ex x_i / sum{x_i})
  3. Reproduction, pass the genes to the next generation. 2 parents are picked and have a child
    - Crossover: combines half of the genetic information from each parent
    - Mutation: adds variation to go beyond the original material (according to probability)

**DNA is always an array!**

2 key changes from *Shakespearean Monkeys* to *Smart Rockets*
1. *Genotype* (data) vs *Phenotype* (expression): Data would be array of direction vectors, but the expression is the path!
2. *Fitness function*: What is the particular fitness function for the particular scenario? (doing it faster? getting nearer?) You can use exponential to make the difference between the fitness scores more pronounced

*Interactive selection*: Instead of having a mathematical function decide the fitness function, you can have the user select which individuals it wants to reproduce

*Ecosystem simulation*: In reality, things don't live exactly the same, and new generations don't fully replace previous ones. Things that live longer, have a higher chance to reproduce.
