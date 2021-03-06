import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import "./style.css"

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rerender:false
    };
  }


  componentDidMount() {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({
      gravity: { scale: 0 },
    });
    var world = engine.world;

    var render = Render.create({
      element: this.refs.scene,
      engine: engine,
      options: {
        wireframes: false,
        background: 'transparent'
      },
    });

    Render.run(render); // run the renderer

    var runner = Runner.create(); // create runner

    Runner.run(runner, engine); // run the engine

    var mouse = Mouse.create(render.canvas), // add mouse control
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 1,
          render: {
            visible: false,
          },
        },
      });
    render.mouse = mouse; // keep the mouse in sync with rendering

    function setMouseScaleAndOffset() {
      if (window.innerWidth >= window.innerHeight) {
        Mouse.setScale(mouse, { x: window.innerWidth / window.innerHeight, y: 1 })
        Mouse.setOffset(mouse, { x: 2500 - (2500 * (window.innerWidth / window.innerHeight)), y: 0 })
      } else {
        Mouse.setScale(mouse, { x: 1, y: window.innerHeight / window.innerWidth })
        Mouse.setOffset(mouse, { x: 0, y: 2500 - (2500 * (window.innerHeight / window.innerWidth)) })
      }
    }
    setMouseScaleAndOffset()
    window.addEventListener('resize', setMouseScaleAndOffset)

    var rascal = Bodies.polygon(2500, 2500, 8, 120, {
      name: "rascal",
      inertia: "Infinity",
      frictionAir: 0.2,
      friction: 0,
      render: {
        visible: false
      },
    });
    var rascalConstraint = Constraint.create({
      name: "rascal_constraint",
      pointA: { x: 2500, y: 2500 },
      bodyB: rascal,
      pointB: { x: 0, y: 0 },
      stiffness: 0.02,
      render: {
        visible: false,
      },
    });
    Composite.clear(world);
    Composite.add(world, [mouseConstraint, rascal, rascalConstraint]);

    //////////////////////////////////////////////////////////////////////////////////////

    var selectedBody = "body_fuzzy";

    var selectedEyes = "eyes_pretty";

    var selectedMouth = "mouth_simple";

    // var selectedNose = "nose_disguise";

    var itemArray = [...this.props.equippedItems
      // { name: "top_hat", size: 2.2 },
      // { name: "arm_glove", size: 3.4 },
      // { name: "arm_glove", size: 3.4 },
      // { name: "party_hat", size: 1.7 },
      // { name: "cherry", size: 2.5 },
      // { name: "arm_default", size: 2.8 },
      // { name: "arm_default", size: 2.8 },
      // {name: 'waffle_cone', size: 1.7}
    ];
    //////////////////////////////////////////////////////////////////////////////////////

    var animation;
    const canvas = document.querySelector("canvas");
    canvas.setAttribute('id', 'rascalCanvas')
    const ctx = canvas.getContext("2d");
    canvas.width = 5000;
    canvas.height = 5000;

    const generate = async () => {
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
      // const noseImage = await new Promise((resolve, reject) => {
      //   const noseImage = new Image();
      //   noseImage.onload = () => resolve(noseImage);
      //   noseImage.onerror = reject;
      //   noseImage.src = `./assets/${selectedNose}.png`;
      // });

      const w = 500;
      const h = 500;
      let frameNumber = 0;

      (function rerender() {
        const bodyOffset = (~~frameNumber * w) % bodyImage.width;
        const eyesOffset = (~~frameNumber * w) % eyesImage.width;
        const mouthOffset = (~~frameNumber * w) % mouthImage.width;
        // const noseOffset = (~~frameNumber * w) % noseImage.width;
        const { x, y } = rascal.position;
        ctx.drawImage(
          bodyImage, // image
          bodyOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          w, // dWidth
          h // dHeight
        );
        ctx.drawImage(
          eyesImage, // image
          eyesOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          w, // dWidth
          h // dHeight
        );
        ctx.drawImage(
          mouthImage, // image
          mouthOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          w, // dWidth
          h // dHeight
        );
        // ctx.drawImage(
        //   noseImage, // image
        //   noseOffset, // sx
        //   0, // sy
        //   w, // sWidth
        //   h, // sHeight
        //   x - w / 2, // dx
        //   y - h / 2, // dy
        //   w, // dWidth
        //   h // dHeight
        // );
        frameNumber += 0.1;
        // Matter.Engine.update(engine);
        animation = requestAnimationFrame(rerender);
      })();
    };
    generate();

    var equippedItems

    function addItems() {
      equippedItems = []//equippedItems array is only used for devMode

      for (let i = 0; i < itemArray.length; i++) {
        var item = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[i].size - 1),
          90,
          100 * itemArray[i].size,
          {
            name: itemArray[i].name,
            frictionAir: 0.06,
            friction: 0,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[i].name}.png`
              }
            }
          }
        );
        equippedItems.push(item)//equippedItems array is only used for devMode

        var itemConstraint = Constraint.create({
          name: `${itemArray[i].name}_constraint`,
          pointA: rascal.position,
          bodyB: item,
          pointB: { x: 0, y: itemArray[i].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });

        Composite.add(world, [item, itemConstraint]);
      }

    }
    addItems();

    //functions for feeding the rascal

    const Food = () => {
      var milkshake = Matter.Bodies.rectangle(2055, 2750, 52, 120)

      Matter.World.add(engine.world, milkshake)
    }

    const FeedRascal = () => {

    }

    // Food();

    function checkCoor() {
      var bodies = Composite.allBodies(world);
      var constraints = Composite.allConstraints(world);
      for (var i = 0; i < bodies.length; i++) {
        console.log(bodies[i].name, bodies[i].position, bodies[i].angle);
      }
      for (var i = 0; i < constraints.length; i++) {
        console.log(constraints[i].name, constraints[i].pointB);
      }
    }

    const changeSelections = () => {
      selectedBody = myContext.userRascal.body + '_' + myContext.userRascal.color || "empty";

      selectedEyes = myContext.userRascal.eyes || "empty";

      selectedMouth = myContext.userRascal.mouth || "empty";

      selectedNose = myContext.userRascal.nose || "empty";

      itemArray = [...myContext.equipItems
        // { name: "top_hat", size: 2.2 },
        // { name: "arm_glove", size: 3.4 },
        // { name: "arm_glove", size: 3.4 },
        // { name: "party_hat", size: 1.7 },
        // { name: "cherry", size: 2.5 },
        // { name: "arm_default", size: 2.8 },
        // { name: "arm_default", size: 2.8 },
        // {name: 'waffle_cone', size: 1.7}
      ];
      cancelAnimationFrame(animation);
      generate();
    }

    var devModeActive;
    function devMode() {
      var checkBox = document.getElementById("devMode");
      if (checkBox.checked == true) {
        devModeActive = true
        cancelAnimationFrame(animation)
        rascal.render.visible = true
        for (let i = 0; i < equippedItems.length; i++) {
          equippedItems[i].render.sprite = 0
        }
      } else {
        devModeActive = false
        cancelAnimationFrame(animation)
        rascal.render.visible = false
        for (let i = 0; i < equippedItems.length; i++) {
          equippedItems[i].render.sprite = { xScale: 1, yScale: 1, xOffset: 0.5, yOffset: 0.5, texture: `./assets/${equippedItems[i].name}.png` }
        }
        generate()
      }
    }
  }
}
