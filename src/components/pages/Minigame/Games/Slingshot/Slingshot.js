import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import './minigame.css'
import AppContext from "./../../../../AppContext"

class Slingshot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collisions: 0
    };
  }

  static contextType = AppContext;

  componentDidMount() {

    const myContext = this.context;


    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Constraint = Matter.Constraint;

    function setupEngine() {
      var engine = Engine.create();
      Matter.Runner.run(engine);
      return engine;
    }

    const setupRender = () => {
      var render = Render.create({
        element: this.refs.slingshot,
        engine: engine,
        options: {
          width: 800,
          height: 600,
          wireframes: false,
          background: "url(https://i.imgur.com/LWwkqvS.png)"
        }
      });
      Render.run(render);
      Matter.Runner.run(render)
      return render;
    }

    function createMouse() {
      var mouse = Mouse.create(render.canvas);
      var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse
      });
      World.add(world, mouseConstraint);
      // keep the mouse in sync with rendering
      render.mouse = mouse;
      return mouseConstraint;
    }



    function createFloor() {
      var floor = Bodies.rectangle(400, 580, 800, 40, {
        isStatic: true,
        render: {
          sprite: {
            texture: "https://i.imgur.com/lG587fv.png",
            yScale: 40 / 70,
            xScale: 800 / 70
          }
        }
      });
      World.add(world, floor);
    }


    var blockImage = 'elementWood019'
    function create1x3Block(x, y, scale = 0.5) {
      const box = Bodies.rectangle(x, y, 70 * scale, 220 * scale, {
        render: {
          sprite: {
            texture: `./assets/${blockImage}.png`,
            xScale: scale,
            yScale: scale
          }
        },
        label: "box"
      });
      World.add(world, box);
      return box;
    }

    function create3x1Block(x, y, scale = 0.5) {
      const box = Bodies.rectangle(x, y, 220 * scale, 70 * scale, {
        render: {
          sprite: {
            texture: "https://i.imgur.com/LRmFmX5.png",
            xScale: scale,
            yScale: scale
          }
        },
        label: "box"
      });
      World.add(world, box);
      return box;
    }

    var birdBody = 'minibody'
    function createBird(x, y) {
      var bird = Bodies.circle(x, y, 10, {
        mass: 10,
        label: "bird",
        render: {
          sprite: {
            // texture: `./assets/${birdBody}.png`,
            texture: "https://imgur.com/6Nmywmw.png",
            xScale: 1 / 3.5,
            yScale: 1 / 3.5
          }
        }
      });
      return bird;
    }

    function createSlingshot(x, y) {
      var slingshotPosition = {
        x: x,
        y: y
      };

      var point = { x: slingshotPosition.x, y: slingshotPosition.y };
      var bird = createBird(slingshotPosition.x, slingshotPosition.y);

      var slingshot = Constraint.create({
        pointA: point,
        bodyB: bird,
        stiffness: 0.01
      });

      Matter.Events.on(engine, "afterUpdate", event => {
        if (
          mouseConstraint.mouse.button === -1 &&
          (bird.position.x > slingshotPosition.x &&
            bird.position.y < slingshotPosition.y)
        ) {
          bird = createBird(slingshotPosition.x, slingshotPosition.y);
          World.add(world, bird);
          slingshot.bodyB = bird;
        }
      });

      World.add(world, bird);
      World.add(world, slingshot);
    }

    function createBox(x, y, scale = 0.5) {
      var box = Bodies.rectangle(x, y, 70 * scale, 70 * scale, {
        render: {
          sprite: {
            texture: "https://imgur.com/sL4idpe.png",
            xScale: scale,
            yScale: scale
          }
        },
        label: "box"
      });
      return box;
    }

    function createPyramid(x, y) {
      var stack = Matter.Composites.pyramid(x, y, 9, 6, 0, 0, function (x, y) {
        return createBox(x, y);
      });
      World.add(world, stack);
    }

    function detectBirdAndBoxCollision(pair) {
      var condition1 = pair.bodyA.label === "bird" && pair.bodyB.label === "box";
      var condition2 = pair.bodyA.label === "box" && pair.bodyB.label === "bird";

      return condition1 || condition2;
    }

    const collisionCount = () => {
      this.setState({ collisions: this.state.collisions + 1 })
      console.log(this.state.collisions)
      // coinCount();
    }


    function onBirdAndBoxCollision(pair) {
      if (pair.bodyB.label === "bird") {
        World.remove(world, pair.bodyB);
        Matter.Body.applyForce(pair.bodyB, pair.bodyB.position, pair.bodyA.force);
        collisionCount();
      }

      if (pair.bodyA.label === "bird") {
        World.remove(world, pair.bodyA);
        Matter.Body.applyForce(pair.bodyB, pair.bodyA.position, pair.bodyA.force);
        collisionCount();
      }
    }

    function setupBirdAndBoxCollision() {
      Matter.Events.on(engine, "collisionStart", event => {
        event.pairs
          .filter(pair => {
            return detectBirdAndBoxCollision(pair);
          })
          .forEach(pair => {
            console.log(pair);
            onBirdAndBoxCollision(pair);
          });
      });
    }

    function setupNewBodyCreation() {
      Matter.Events.on(mouseConstraint, "mousedown", event => {
        var source = event.source;
        var mouse = event.mouse;

        if (source.body === null) {
          var box = Bodies.rectangle(mouse.position.x, mouse.position.y, 20, 20);
          World.add(world, box);
        }
      });
    }

    function createEnemy(x, y, scale = 0.5) {
      var enemy = Bodies.rectangle(x, y, 70 * scale, 70 * scale, {
        render: {
          sprite: {
            texture: "https://imgur.com/3pxNMk6.png",
            xScale: scale,
            yScale: scale
          }
        },
        label: "enemy"
      });
      World.add(world, enemy);
    }



    function createEnemyHouse(x, y) {
      var wall1 = create1x3Block(x - 38, y);
      var wall2 = create1x3Block(x + 38, y);
      var roof = create3x1Block(x, y - 100);
    }

    function createEnemyInTheHouse(x, y) {
      createEnemy(x, y);
      createEnemyHouse(x, y);
    }



    //functions for mobile rendering 
    function createPlatform() {
      var platform = Bodies.rectangle(550, 200, 200, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: "https://i.imgur.com/lG587fv.png",
            yScale: 20 / 70,
            xScale: 200 / 70
          }
        }
      });
      World.add(world, platform);
    }

    function secondPlatform() {
      var platform = Bodies.rectangle(570, 400, 200, 20, {
        isStatic: true,
        render: {
          sprite: {
            texture: "https://i.imgur.com/lG587fv.png",
            yScale: 20 / 70,
            xScale: 200 / 70
          }
        }
      });
      World.add(world, platform);
    }

    var engine = setupEngine();
    var render = setupRender();
    var world = engine.world;
    var mouseConstraint = createMouse();

    setupBirdAndBoxCollision();
    createFloor();




    if (window.innerWidth < 400) {
      createSlingshot(300,300)
      createPlatform();
      secondPlatform();
      createEnemyInTheHouse(545, 500);
      createEnemyInTheHouse(445, 500);
      createEnemyInTheHouse(510, 150);
      createEnemyInTheHouse(545, 350);

    } else {

      createSlingshot(120, 500);

      createEnemyInTheHouse(650, 500);
      createEnemyInTheHouse(650, 350);
      createEnemyInTheHouse(650, 200);
      createEnemyInTheHouse(535, 500);
    }

  }

  render() {
    return <div ref="slingshot" id='slingshot-container' />;
  }
}

export default Slingshot;