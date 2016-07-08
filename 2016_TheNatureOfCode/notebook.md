# The Nature of Code

## Table of content
- [Session 2, Vectors](#session2)
- [Session 3, Steering Behaviors](#id-session3)
- [Session 4, Fractals](#id-session4)
- [Session 5](#session5)

<div id='id-session2'/>
## Session 2, Vectors <a name="session2"></a>
When using various .js files, UPDATE index.html !!! Every .js file should go before the script.js one.

1. Physics engine (acceleration, gravity, friction, etc) Force: Newton's Laws (2nd law) > Vector that causes a mass object to accelerate
F=m*a => a=F/m (if m=1) => a=F
2. function applyForce is EXTERNAL!
3. To add another force, accelerations must add each force, but must be reset before the following frame!

<div id='id-session3'/>
## Session 3, Steering Behaviors
>Simulating AUTONOMOUS AGENTS (acting = moving), being a live, active thing. 3 principles:
1. Limited! ability to perceive it's environment (within a certain distance, or LoS > design decisions)
2. What it does with that perception? > Executes an action (force)
3. They have no leader, they act on their own

They have a certain BEHAVIOR, and a lot of "vehicles" moving on their own can make really complex systems. (Steering behaviors for autonomous characters, paper in session resources)

3 steps:
1. Action Selection: A vehicle has a goal, and decides to take an action to reach that goal (desire) > CRITICAL STEP!
2. *Steering*: Force calculation! > steering = desired-velocity
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
## Session 5, <a name="session5"></a>
