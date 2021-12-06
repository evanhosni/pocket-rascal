import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import MatterAttractors from "matter-attractors"
import '../minigame.css'
import AppContext from "./../../../../AppContext"

class Pinball extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      gameOver: false
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

    Matter.use(MatterAttractors);

    function setupEngine() {
      var engine = Engine.create();
      Matter.Runner.run(engine);
      return engine;
    }

    const setupRender = () => {
      var render = Render.create({
        element: this.refs.pinball,
        engine: engine,
        options: {
          width: 2000,
          height: 2000,
          wireframes: false,
          // background: "url(https://i.imgur.com/LWwkqvS.png)"
        }
      });
      Render.run(render);
      Matter.Runner.run(render)
      return render;
    }

    function createMouse() {
      var mouse = Mouse.create(render.canvas);
      var mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 1,
          render: {
            visible: false,
          },
        },
      });
      World.add(world, mouseConstraint);
      // keep the mouse in sync with rendering
      render.mouse = mouse;
      if (window.innerWidth >= window.innerHeight) {
        Mouse.setScale(mouse, { x: 0, y: 1 })
        Mouse.setOffset(mouse, { x: 1215, y: 0 })
      } else {//TODO: fix this
        Mouse.setScale(mouse, { x: 0, y: 0.5 * ((window.innerHeight) / window.innerWidth) })
        Mouse.setOffset(mouse, { x: 1215, y: 1000 - (500 * (window.innerHeight / window.innerWidth)) })
      }
      return mouseConstraint;
    }
    function resize() {
      World.remove(world, mouseConstraint)
      createMouse()
    }
    window.addEventListener('resize', resize)

    let ball, stopperGroup;
    let leftPaddle, leftUpStopper, leftDownStopper, isLeftPaddleUp;
    let rightPaddle, rightUpStopper, rightDownStopper, isRightPaddleUp;
    stopperGroup = Matter.Body.nextGroup(true);
    isLeftPaddleUp = false;
    isRightPaddleUp = false;

    var ballBody = 'minibody'
    function createBall(x, y) {
      ball = Bodies.circle(x, y, 10, {
        mass: 5,
        label: "ball",
        collisionFilter: {
          group: stopperGroup
        },
        render: {
          sprite: {
            // texture: `./assets/${ballBody}.png`,
            // xScale: 0.25 / 3.5,
            // yScale: 0.25 / 3.5
            texture: "https://imgur.com/6Nmywmw.png",
            xScale: 1 / 3.5,
            yScale: 1 / 3.5
          }
        }
      });
      // setInterval(function(){ console.log('ball',ball.position); }, 3000);
      return ball;
    }

    function createSlingshot(x, y) {
      var slingshotPosition = {
        x: x,
        y: y
      };

      var point = { x: slingshotPosition.x, y: slingshotPosition.y };
      var ball = createBall(slingshotPosition.x, slingshotPosition.y);

      var slingshot = Constraint.create({
        pointA: point,
        bodyB: ball,
        stiffness: 0.01
      });

      Matter.Events.on(engine, "afterUpdate", event => {
        if (
          mouseConstraint.mouse.button === -1 &&
          (
            ball.position.y < slingshotPosition.y)
        ) {
          ball = createBall(slingshotPosition.x, slingshotPosition.y);
          // World.add(world, ball);
          slingshot.bodyB = ball;
        }
      });

      World.add(world, ball);
      World.add(world, slingshot);
    }

    var engine = setupEngine();
    var render = setupRender();
    var world = engine.world;
    var mouseConstraint = createMouse();

    const PATHS = {
      DOME_LEFT1: '0 0, 50 0, 0 250, 0 0',
      DOME_RIGHT1: '0 0, 50 0, 50 250, 0 0',
      DOME_LEFT2: '0 0, 100 0, 0 250, 0 0',
      DOME_RIGHT2: '0 0, 100 0, 100 250, 0 0',
      DOME_LEFT3: '0 0, 150 0, 0 250, 0 0',
      DOME_RIGHT3: '0 0, 150 0, 150 250, 0 0',
      DOME_LEFT4: '0 0, 200 0, 0 200, 0 0',
      DOME_RIGHT4: '0 0, 200 0, 200 200, 0 0',
      DOME_LEFT5: '0 0, 250 0, 0 150, 0 0',
      DOME_RIGHT5: '0 0, 250 0, 250 150, 0 0',
      DOME_LEFT6: '0 0, 300 0, 0 100, 0 0',
      DOME_RIGHT6: '0 0, 300 0, 300 100, 0 0',

      DROP_LEFT: '0 0 20 0 70 100 20 150 0 150 0 0',
      DROP_RIGHT: '50 0 68 0 68 150 50 150 0 100 50 0',
      APRON_LEFT: '0 0 180 120 0 120 0 0',
      APRON_RIGHT: '180 0 180 120 0 120 180 0'
    };
    const COLOR = {
      BACKGROUND: '#212529',
      OUTER: '#495057',
      INNER: '#15aabf',
      BUMPER: '#fab005',
      BUMPER_LIT: '#fff3bf',
      PADDLE: '#e64980',
      PINBALL: '#dee2e6'
    };
    const GRAVITY = 0.1;
    engine.gravity.y = GRAVITY
    world.gravity.y = GRAVITY
    const WIREFRAMES = false;
    const BUMPER_BOUNCE = 1.5;
    const PADDLE_PULL = 0.002;
    const MAX_VELOCITY = 50;

    function boundary(x, y, width, height) {
      return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
          fillStyle: COLOR.OUTER
        }
      });
    }

    function wall(x, y, width, height, color, angle = 0) {
      return Matter.Bodies.rectangle(x, y, width, height, {
        angle: angle,
        isStatic: true,
        chamfer: { radius: 10 },
        render: {
          fillStyle: color
        },
      });
    }

    function path(x, y, path) {
      let vertices = Matter.Vertices.fromPath(path);
      return Matter.Bodies.fromVertices(x, y, vertices, {
        isStatic: true,
        render: {
          fillStyle: COLOR.OUTER,

          // add stroke and line width to fill in slight gaps between fragments
          strokeStyle: COLOR.OUTER,
          lineWidth: 1
        }
      });
    }

    function bumper(x, y) {
      let bumper = Matter.Bodies.circle(x, y, 25, {
        label: 'bumper',
        isStatic: true,
        render: {
          fillStyle: COLOR.BUMPER
        }
      });

      // for some reason, restitution is reset unless it's set after body creation
      bumper.restitution = BUMPER_BOUNCE;

      return bumper;
    }

    function stopper(x, y, side, position) {
      // determine which paddle composite to interact with
      let attracteeLabel = (side === 'left') ? 'paddleLeftComp' : 'paddleRightComp';

      return Matter.Bodies.circle(x, y, 40, {
        isStatic: true,
        render: {
          visible: false,
        },
        collisionFilter: {
          group: stopperGroup
        },
        plugin: {
          attractors: [
            // stopper is always a, other body is b
            function (a, b) {
              if (b.label === attracteeLabel) {
                let isPaddleUp = (side === 'left') ? isLeftPaddleUp : isRightPaddleUp;
                let isPullingUp = (position === 'up' && isPaddleUp);
                let isPullingDown = (position === 'down' && !isPaddleUp);
                if (isPullingUp || isPullingDown) {
                  return {
                    x: (a.position.x - b.position.x) * PADDLE_PULL,
                    y: (a.position.y - b.position.y) * PADDLE_PULL,
                  };
                }
              }
            }
          ]
        }
      });
    }


    function reset(x, width) {
      return Matter.Bodies.rectangle(x, 1380, width, 2, {
        label: 'reset',
        isStatic: true,
        render: {
          fillStyle: '#fff'
        }
      });
    }

    function createStaticBodies() {
      Matter.World.add(world, [
        // table boundaries (top, bottom, left, right)
        boundary(1000, 570, 500, 100),
        boundary(1000, 1430, 500, 100),
        boundary(720, 1000, 100, 800),
        boundary(1280, 1000, 100, 800),

        // dome
        // path(989, 686, PATHS.DOME),//TODO: get dome working
        path(780, 700, PATHS.DOME_LEFT1),
        path(1220, 700, PATHS.DOME_RIGHT1),
        path(780, 700, PATHS.DOME_LEFT2),
        path(1220, 700, PATHS.DOME_RIGHT2),
        path(780, 690, PATHS.DOME_LEFT3),
        path(1220, 690, PATHS.DOME_RIGHT3),
        path(780, 680, PATHS.DOME_LEFT4),
        path(1220, 680, PATHS.DOME_RIGHT4),
        path(790, 660, PATHS.DOME_LEFT5),
        path(1210, 660, PATHS.DOME_RIGHT5),
        path(780, 650, PATHS.DOME_LEFT6),
        path(1220, 650, PATHS.DOME_RIGHT6),

        // pegs (left, mid, right)
        wall(890, 740, 20, 40, COLOR.INNER),
        wall(975, 740, 20, 40, COLOR.INNER),
        wall(1060, 740, 20, 40, COLOR.INNER),

        // top bumpers (left, mid, right)
        bumper(855, 850),
        bumper(975, 850),
        bumper(1095, 850),

        // bottom bumpers (left, right)
        bumper(915, 940),
        bumper(1035, 940),

        // shooter lane wall
        wall(1190, 1120, 20, 560, COLOR.OUTER),

        // drops (left, right)
        path(775, 960, PATHS.DROP_LEFT),
        path(1175, 960, PATHS.DROP_RIGHT),

        // slingshots (left, right)
        wall(870, 1110, 20, 120, COLOR.INNER),
        wall(1080, 1110, 20, 120, COLOR.INNER),

        // out lane walls (left, right)
        wall(810, 1129, 20, 160, COLOR.INNER),
        wall(1140, 1129, 20, 160, COLOR.INNER),

        // flipper walls (left, right);
        wall(843, 1224, 20, 98, COLOR.INNER, -0.96),
        wall(1107, 1224, 20, 98, COLOR.INNER, 0.96),

        // aprons (left, right)
        path(829, 1340, PATHS.APRON_LEFT),
        path(1121, 1340, PATHS.APRON_RIGHT),

        // reset zones (center, right)
        reset(975, 50),
        reset(1215, 30)
      ]);
    }

    function createPaddles() {

      leftUpStopper = stopper(910, 1191, 'left', 'up');
      leftDownStopper = stopper(890, 1343, 'left', 'down');
      rightUpStopper = stopper(1040, 1191, 'right', 'up');
      rightDownStopper = stopper(1060, 1343, 'right', 'down');
      const leftStopperWall = Matter.Bodies.rectangle(870, 1272, 40, 200, {
        collisionFilter: {
          group: stopperGroup
        },
        isStatic: true,
        angle: 0.3,
        render: {
          visible: false,
        },
      })
      const rightStopperWall = Matter.Bodies.rectangle(1080, 1272, 40, 200, {
        collisionFilter: {
          group: stopperGroup
        },
        isStatic: true,
        angle: -0.3,
        render: {
          visible: false,
        },
      })
      Matter.World.add(world, [leftUpStopper, leftDownStopper, leftStopperWall, rightUpStopper, rightDownStopper, rightStopperWall]);

      // this group lets paddle pieces overlap each other
      let paddleGroup = Matter.Body.nextGroup(true);

      // Left paddle mechanism
      let paddleLeft = {};
      paddleLeft.paddle = Matter.Bodies.trapezoid(920, 1260, 20, 80, 0.33, {
        label: 'paddleLeft',
        angle: 1.57,
        chamfer: {},
        render: {
          fillStyle: COLOR.PADDLE
        }
      });
      paddleLeft.brick = Matter.Bodies.rectangle(922, 1272, 40, 80, {
        angle: 5,
        chamfer: {},
        render: {
          visible: false
        }
      });
      paddleLeft.comp = Matter.Body.create({
        label: 'paddleLeftComp',
        parts: [paddleLeft.paddle, paddleLeft.brick]
      });
      paddleLeft.hinge = Matter.Bodies.circle(892, 1260, 5, {
        isStatic: true,
        render: {
          visible: false
        }
      });
      Object.values(paddleLeft).forEach((piece) => {
        piece.collisionFilter.group = paddleGroup
      });
      paddleLeft.con = Matter.Constraint.create({
        bodyA: paddleLeft.comp,
        pointA: { x: -29.5, y: -8.5 },
        bodyB: paddleLeft.hinge,
        length: 0,
        stiffness: 0
      });

      Matter.World.add(world, [paddleLeft.comp, paddleLeft.hinge, paddleLeft.con]);
      Matter.Body.rotate(paddleLeft.comp, 0.57, { x: 142, y: 660 });

      // right paddle mechanism
      let paddleRight = {};
      paddleRight.paddle = Matter.Bodies.trapezoid(1030, 1260, 20, 80, 0.33, {
        label: 'paddleRight',
        angle: -1.57,
        chamfer: {},
        render: {
          fillStyle: COLOR.PADDLE
        }
      });
      paddleRight.brick = Matter.Bodies.rectangle(1028, 1272, 40, 80, {
        angle: -5,
        chamfer: {},
        render: {
          visible: false
        }
      });
      paddleRight.comp = Matter.Body.create({
        label: 'paddleRightComp',
        parts: [paddleRight.paddle, paddleRight.brick]
      });
      paddleRight.hinge = Matter.Bodies.circle(1058, 1260, 5, {
        isStatic: true,
        render: {
          visible: false
        }
      });
      Object.values(paddleRight).forEach((piece) => {
        piece.collisionFilter.group = paddleGroup
      });
      paddleRight.con = Matter.Constraint.create({
        bodyA: paddleRight.comp,
        pointA: { x: 29.5, y: -8.5 },
        bodyB: paddleRight.hinge,
        length: 0,
        stiffness: 0
      });
      Matter.World.add(world, [paddleRight.comp, paddleRight.hinge, paddleRight.con]);
      Matter.Body.rotate(paddleRight.comp, -0.57, { x: 308, y: 660 });
    }

    const pingBumper = (bumper) => {

      this.setState({ score: this.state.score + 1 })

      // flash color
      bumper.render.fillStyle = COLOR.BUMPER_LIT;
      setTimeout(function () {
        bumper.render.fillStyle = COLOR.BUMPER;
      }, 100);
    }

    const endGame = () => {
      this.setState({ gameOver: true })
      console.log(this.state.gameOver)
    }


    const createEvents = () => {
      var rounds = 0;
      // events for when the pinball hits stuff
      Matter.Events.on(engine, 'collisionStart', function (event) {
        let pairs = event.pairs;
        pairs.forEach(function (pair) {
          if (pair.bodyA.label === 'ball') {
            switch (pair.bodyB.label) {
              case 'reset':
                rounds = (rounds + 1)
                console.log(rounds)
                if (rounds < 4) {
                  World.remove(world, pair.bodyA);
                  createSlingshot(1215, 1200);
                } else { endGame() }
                console.log(pair)
                break;
              case 'bumper':
                pingBumper(pair.bodyB);
                console.log(pair)
                break;
            }
          }
        });
        pairs.forEach(function (pair) {
          if (pair.bodyB.label === 'ball') {
            switch (pair.bodyA.label) {
              case 'reset':
                rounds = (rounds + 1)
                console.log(rounds)
                if (rounds < 4) {
                  World.remove(world, pair.bodyB);
                  createSlingshot(1215, 1200);
                } else { endGame() }
                console.log(pair)

                break;
              case 'bumper':
                pingBumper(pair.bodyA);
                console.log(pair)
                break;
            }
          }
        });

      });
      // Matter.Events.on(engine, 'beforeUpdate', function(event) {
      //   // bumpers can quickly multiply velocity, so keep that in check
      //   Matter.Body.setVelocity(pinball, {
      //     x: Math.max(Math.min(pinball.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
      //     y: Math.max(Math.min(pinball.velocity.y, MAX_VELOCITY), -MAX_VELOCITY),
      //   });

      //   // cheap way to keep ball from going back down the shooter lane
      //   if (pinball.position.x > 450 && pinball.velocity.y > 0) {
      //     Matter.Body.setVelocity(pinball, { x: 0, y: -10 });
      //   }
      // });

      // // mouse drag (god mode for grabbing pinball)
      // Matter.World.add(world, Matter.MouseConstraint.create(engine, {
      //   mouse: Matter.Mouse.create(render.canvas),
      //   constraint: {
      //     stiffness: 0.2,
      //     render: {
      //       visible: false
      //     }
      //   }
      // }));

      // keyboard paddle events
      window.addEventListener('keydown', function (e) {
        if (e.which === 37) { // left arrow key
          isLeftPaddleUp = true;
          console.log('left')
        } else if (e.which === 39) { // right arrow key
          isRightPaddleUp = true;
          console.log('right')
        }
      });
      window.addEventListener('keyup', function (e) {
        if (e.which === 37) { // left arrow key
          isLeftPaddleUp = false;
        } else if (e.which === 39) { // right arrow key
          isRightPaddleUp = false;
        }
      });
    }

    //paddle events for tap btns
    const leftTrig = document.getElementById("left-trig")
    if (leftTrig) {
      leftTrig.addEventListener('touchstart', () => {
        isLeftPaddleUp = true;
      })
      leftTrig.addEventListener('touchend', () => {
        isLeftPaddleUp = false;
      })
    }

    const rightTrig = document.getElementById('right-trig')
    if (rightTrig) {
      rightTrig.addEventListener('touchstart', () => {
        isRightPaddleUp = true;
      })
      rightTrig.addEventListener('touchend', () => {
        isRightPaddleUp = false;
      })
    }

    createSlingshot(1215, 1200)
    createStaticBodies();
    createPaddles();
    createEvents();



    var selectedBody = myContext.userRascal.body || "empty";

    var selectedEyes = myContext.userRascal.eyes || "empty";

    var selectedMouth = myContext.userRascal.mouth || "empty";

    var selectedNose = myContext.userRascal.nose || "empty";

    var animation;
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    // canvas.width = 5000;
    // canvas.height = 5000;

    const generate = async () => {
      cancelAnimationFrame(animation);
      const bodyImage = await new Promise((resolve, reject) => {
        const bodyImage = new Image();
        bodyImage.onload = () => resolve(bodyImage);
        bodyImage.onerror = reject;
        bodyImage.src = `./assets/${selectedBody}.png`;
      });
      const eyesImage = await new Promise((resolve, reject) => {
        const eyesImage = new Image();
        eyesImage.onload = () => resolve(eyesImage);
        eyesImage.onerror = reject;
        eyesImage.src = `./assets/${selectedEyes}.png`;
      });
      const mouthImage = await new Promise((resolve, reject) => {
        const mouthImage = new Image();
        mouthImage.onload = () => resolve(mouthImage);
        mouthImage.onerror = reject;
        mouthImage.src = `./assets/${selectedMouth}.png`;
      });
      const noseImage = await new Promise((resolve, reject) => {
        const noseImage = new Image();
        noseImage.onload = () => resolve(noseImage);
        noseImage.onerror = reject;
        noseImage.src = `./assets/${selectedNose}.png`;
      });

      const w = 500;
      const h = 500;
      let frameNumber = 0;

      (function rerender() {
        const bodyOffset = (~~frameNumber * w) % bodyImage.width;
        const eyesOffset = (~~frameNumber * w) % eyesImage.width;
        const mouthOffset = (~~frameNumber * w) % mouthImage.width;
        const noseOffset = (~~frameNumber * w) % noseImage.width;
        const { x, y } = ball.position;
        ctx.drawImage(
          bodyImage, // image
          bodyOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          50, // dWidth
          50 // dHeight
        );
        ctx.drawImage(
          eyesImage, // image
          eyesOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          50, // dWidth
          50 // dHeight
        );
        ctx.drawImage(
          mouthImage, // image
          mouthOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          50, // dWidth
          50 // dHeight
        );
        ctx.drawImage(
          noseImage, // image
          noseOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          50, // dWidth
          50 // dHeight
        );
        frameNumber += 0.1;
        // Matter.Engine.update(engine);
        animation = requestAnimationFrame(rerender);
      })();
    };
    // generate();



    // setInterval(() => {
    //   // console.log(ball.position)
    // }, 2000);


  }



  render() {
    const myContext = this.context;
    let width = window.innerWidth
    var mobileBtns = false;
    if (width < 768){
      mobileBtns = true
    }
    return (
      <div>
        <div class="score current-score">
          {`score ${this.state.score}`}
          <span></span>
        </div>
        <div ref="pinball" id='pinball-container' />

        {mobileBtns && <div>
          <button style={{ position: "absolute", bottom: 70, left: 50 }}
            class="trigger left-trigger" id='left-trig'>tap!</button>
          <button style={{ position: "absolute", bottom: 70, right: 80 }}
            class="trigger right-trigger" id='right-trig'>tap!</button>
        </div>}

        {
          this.state.gameOver && <div
            className="pinball-splash"
          >
            <div>Game Over!</div>
            <button
            >
              Play Again
            </button>
            <button
              onClick={() => {
                myContext.setCurrentPage('Minigame');
                myContext.userRascal.coins = (myContext.userRascal.coins + this.state.score)
                myContext.setCoins(myContext.userRascal.coins)
                myContext.setEarnedCoins(myContext.earnings + this.state.score)
                myContext.userRascal.xp = (myContext.userRascal.xp + this.state.score)
                myContext.setXP(myContext.userRascal.xp)
              }}>
              Play Another Game</button>
            <button
              onClick={() => {
                myContext.setCurrentPage('Dashboard');
                myContext.userRascal.coins = (myContext.userRascal.coins + this.state.score)
                myContext.setCoins(myContext.userRascal.coins)
                myContext.userRascal.xp = (myContext.userRascal.xp + this.state.score)
                myContext.setXP(myContext.userRascal.xp)
              }}>
              Exit
            </button>
          </div>
        }
      </div>
    )
  }
}

export default Pinball;