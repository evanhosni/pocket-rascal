import React from "react";
import ReactDOM from "react-dom";
import Matter, { World } from "matter-js";
import "./style.css"
import AppContext from "./../../AppContext";


class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = AppContext;


  componentDidMount() {

    const myContext = this.context;

    // const myContext = useContext(AppContext);
    const ongoingRascal = {
      color:myContext.userRascal.color,
      nose:myContext.userRascal.nose,
      body:myContext.userRascal.body,
      mouth:myContext.userRascal.mouth,
      eyes:myContext.userRascal.eyes,
      coins:myContext.userRascal.coins
    }

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
      enableSleeping: true
    });

    Matter.Runner.run(engine);
    
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

    const bubblecrumbgroup  = Matter.Body.nextGroup(true);

    var rascal = Bodies.polygon(2500, 2500, 8, 120, {
      name: "rascal",
      label: 'rascal-body',
      inertia: "Infinity",
      frictionAir: 0.2,
      friction: 0,
      render: {
        visible: false,
        isSleeping: true
      },
      collisionFilter: {
        group: bubblecrumbgroup
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
    var item1
    var item2
    var item3
    var item4
    var item5
    var item6
    var item7
    var item8
    var selectedBody = myContext.userRascal.body + '_' + myContext.userRascal.color || "empty";

    var selectedEyes = myContext.userRascal.eyes || "empty";

    var selectedMouth = myContext.userRascal.mouth || "empty";

    var selectedNose = myContext.userRascal.nose || "empty";

    var itemArray = [...myContext.equipItems
    ];
    // console.log(itemArray)
    //////////////////////////////////////////////////////////////////////////////////////

    var animation;
    var animationsoap;
    var animationducky;
    const canvas = document.querySelector("canvas");
    canvas.setAttribute('id', 'rascalCanvas')
    const ctx = canvas.getContext("2d");
    canvas.width = 5000;
    canvas.height = 5000;

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
        ctx.drawImage(
          noseImage, // image
          noseOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          w, // dWidth
          h // dHeight
        );
        frameNumber += 0.1;
        // Matter.Engine.update(engine);
        animation = requestAnimationFrame(rerender);

      })();
    };

    generate();


    var equippedItems

    function addItems() {
      equippedItems = []//equippedItems array is only used for devMode


      if (itemArray[0]) {
        item1 = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[0].size - 1),
          90,
          100 * itemArray[0].size,
          {
            name: itemArray[0].name,
            label: itemArray[0].name,
            frictionAir: 0.06,
            friction: 0.5,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[0].name}.png`
              }
            }
          });
        equippedItems.push(item1)//equippedItems array is only used for devMode

        var itemConstraint1 = Constraint.create({
          name: `${itemArray[0].name}_constraint`,
          pointA: rascal.position,
          bodyB: item1,
          pointB: { x: 0, y: itemArray[0].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });
        Composite.add(world, [item1, itemConstraint1]);
      }
      if (itemArray[1]) {
        item2 = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[1].size - 1),
          90,
          100 * itemArray[1].size,
          {
            name: itemArray[1].name,
            frictionAir: 0.06,
            friction: 0,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[1].name}.png`
              }
            }
          }
        );
        equippedItems.push(item2)//equippedItems array is only used for devMode

        var itemConstraint2 = Constraint.create({
          name: `${itemArray[1].name}_constraint`,
          pointA: rascal.position,
          bodyB: item2,
          pointB: { x: 0, y: itemArray[1].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });
        Composite.add(world, [item2, itemConstraint2]);
      }
      if (itemArray[2]) {
        item3 = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[2].size - 1),
          90,
          100 * itemArray[2].size,
          {
            name: itemArray[2].name,
            frictionAir: 0.06,
            friction: 0,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[2].name}.png`
              }
            }
          }
        );
        equippedItems.push(item3)//equippedItems array is only used for devMode

        var itemConstraint3 = Constraint.create({
          name: `${itemArray[2].name}_constraint`,
          pointA: rascal.position,
          bodyB: item3,
          pointB: { x: 0, y: itemArray[2].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });
        Composite.add(world, [item3, itemConstraint3]);
      }
      if (itemArray[3]) {
        item4 = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[3].size - 1),
          90,
          100 * itemArray[3].size,
          {
            name: itemArray[3].name,
            frictionAir: 0.06,
            friction: 0,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[3].name}.png`
              }
            }
          }
        );
        equippedItems.push(item4)//equippedItems array is only used for devMode

        var itemConstraint4 = Constraint.create({
          name: `${itemArray[3].name}_constraint`,
          pointA: rascal.position,
          bodyB: item4,
          pointB: { x: 0, y: itemArray[3].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });
        Composite.add(world, [item4, itemConstraint4]);
      }
      if (itemArray[4]) {
        item5 = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[4].size - 1),
          90,
          100 * itemArray[4].size,
          {
            name: itemArray[4].name,
            frictionAir: 0.06,
            friction: 0,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[4].name}.png`
              }
            }
          }
        );
        equippedItems.push(item5)//equippedItems array is only used for devMode

        var itemConstraint5 = Constraint.create({
          name: `${itemArray[4].name}_constraint`,
          pointA: rascal.position,
          bodyB: item5,
          pointB: { x: 0, y: itemArray[4].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });
        Composite.add(world, [item5, itemConstraint5]);
      }
      if (itemArray[5]) {
        item6 = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[5].size - 1),
          90,
          100 * itemArray[5].size,
          {
            name: itemArray[5].name,
            frictionAir: 0.06,
            friction: 0,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[5].name}.png`
              }
            }
          }
        );
        equippedItems.push(item6)//equippedItems array is only used for devMode

        var itemConstraint6 = Constraint.create({
          name: `${itemArray[5].name}_constraint`,
          pointA: rascal.position,
          bodyB: item6,
          pointB: { x: 0, y: itemArray[5].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });
        Composite.add(world, [item6, itemConstraint6]);
      }
      if (itemArray[6]) {
        item7 = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[6].size - 1),
          90,
          100 * itemArray[6].size,
          {
            name: itemArray[6].name,
            frictionAir: 0.06,
            friction: 0,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[6].name}.png`
              }
            }
          }
        );
        equippedItems.push(item7)//equippedItems array is only used for devMode

        var itemConstraint7 = Constraint.create({
          name: `${itemArray[6].name}_constraint`,
          pointA: rascal.position,
          bodyB: item7,
          pointB: { x: 0, y: itemArray[6].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });
        Composite.add(world, [item7, itemConstraint7]);
      }
      if (itemArray[7]) {
        item8 = Bodies.rectangle(
          2500,
          2340 - 1 - 50 * (itemArray[7].size - 1),
          90,
          100 * itemArray[7].size,
          {
            name: itemArray[7].name,
            frictionAir: 0.06,
            friction: 0,
            render: {//TODO this breaks the site
              sprite: {
                texture: `./assets/${itemArray[7].name}.png`
              }
            }
          }
        );
        equippedItems.push(item8)//equippedItems array is only used for devMode

        var itemConstraint8 = Constraint.create({
          name: `${itemArray[7].name}_constraint`,
          pointA: rascal.position,
          bodyB: item8,
          pointB: { x: 0, y: itemArray[7].size / 0.02 },
          stiffness: 0.05,
          render: {
            visible: false,
          },
        });
        Composite.add(world, [item8, itemConstraint8]);
      }
    }
    addItems()



    const equippedItemsPanel = document.querySelector('#equipped-items')
    const customPanel = document.querySelector('#custom-slider')
    const creationPanel = document.querySelector('#creation-panel')
    if (equippedItemsPanel) {
      equippedItemsPanel.addEventListener("click", (e) => {

        var source = e.target.getAttribute('src')
        // console.log(e.target)
        if (source) {

          var isolate = source.split('/')[2].split('.')[0]

          world.bodies.every((item, index) => {
            if (item.name === isolate) {
              Matter.World.remove(world, world.bodies[index])
              return false
            } else {
              return true
            }

          });
          itemArray.forEach((item, index) => {
            if (item.name === isolate) {
              itemArray.splice(index, 1)
              return
            }
          })
        }
      })
    }
    if (customPanel) {
      customPanel.addEventListener("click", (e) => {
        let regNose = /nose/;
        let regBody = /body/;
        let regEyes = /eyes/;
        let regMouth = /mouth/;
        var source = e.target.getAttribute('src')
        var itemSource = e.target.getAttribute('item-size')
        var colorCheck = e.target.getAttribute('data-id')
        var colorValue = e.target.getAttribute('value')
        // console.log(colorCheck)
        // console.log(colorValue)
        
        if (source) {
          var isolate = source.split('/')[2].split('.')[0]

          let resultNose = regNose.exec(isolate)
          let resultBody = regBody.exec(isolate)
          let resultEyes = regEyes.exec(isolate)
          let resultMouth = regMouth.exec(isolate)
          if(colorCheck==='color'){
            let bodyArray = selectedBody.split('_')
            selectedBody = bodyArray[0] + '_' + bodyArray[1]+ '_' + colorValue;
            cancelAnimationFrame(animation);
            generate()
            ongoingRascal.color=colorValue
            myContext.setRascalBodySave({...ongoingRascal})
          }
          if (resultNose) {
            if (isolate === selectedNose) {
              selectedNose = "empty"
              cancelAnimationFrame(animation);
              generate()
              ongoingRascal.nose='empty'
              myContext.setRascalBodySave({...ongoingRascal})
            } else {
              selectedNose = isolate
              cancelAnimationFrame(animation);
              generate()
              ongoingRascal.nose=isolate
              myContext.setRascalBodySave({...ongoingRascal})
            }
          }
          if (resultBody && !colorCheck) {
            
            let bodyDefault = ongoingRascal.body
            if (isolate === bodyDefault) {
              selectedBody = "empty"
              cancelAnimationFrame(animation);
              generate()
              ongoingRascal.body='empty'
              myContext.setRascalBodySave({...ongoingRascal})
            } else {
              selectedBody = isolate + '_' + ongoingRascal.color
              cancelAnimationFrame(animation);
              generate()
              ongoingRascal.body=isolate
              myContext.setRascalBodySave({...ongoingRascal})
            }
          }
          if (resultEyes) {
            if (isolate === selectedEyes) {
              selectedEyes = "empty"
              cancelAnimationFrame(animation);
              generate()
              ongoingRascal.eyes='empty'
              myContext.setRascalBodySave({...ongoingRascal})
            } else {
              selectedEyes = isolate
              cancelAnimationFrame(animation);
              generate()
              ongoingRascal.eyes=isolate
              myContext.setRascalBodySave({...ongoingRascal})
            }
          }
          if (resultMouth) {
            if (isolate === selectedMouth) {
              selectedMouth = "empty"
              cancelAnimationFrame(animation);
              generate()
              ongoingRascal.mouth='empty'
              myContext.setRascalBodySave({...ongoingRascal})
            } else {
              selectedMouth = isolate
              cancelAnimationFrame(animation);
              generate()
              ongoingRascal.mouth=isolate
              myContext.setRascalBodySave({...ongoingRascal})
            }
          }


        }
        console.log(itemSource)
        if (itemSource) {

          if (item1) { Matter.World.remove(world, item1) }
          if (item2) { Matter.World.remove(world, item2) }
          if (item3) { Matter.World.remove(world, item3) }
          if (item4) { Matter.World.remove(world, item4) }
          if (item5) { Matter.World.remove(world, item5) }
          if (item6) { Matter.World.remove(world, item6) }
          if (item7) { Matter.World.remove(world, item7) }
          if (item8) { Matter.World.remove(world, item8) }
          itemArray.push({
            name: isolate,
            size: parseFloat(itemSource)
          })
          addItems()
          // itemArray=[]
        }
      })
    }
    let tempColor = "white"
    if (creationPanel) {
      creationPanel.addEventListener("click", (e) => {
        var colorCheck = e.target.getAttribute('name')
        var value = e.target.getAttribute('value')
        let regNose = /nose/;
        let regBody = /body/;
        let regEyes = /eyes/;
        let regMouth = /mouth/;
        let resultBody = regBody.exec(value)
        let resultNose = regNose.exec(value)
        let resultEyes = regEyes.exec(value)
        let resultMouth = regMouth.exec(value)
        if(colorCheck==='color-radio'){
          tempColor=value
          let bodyArray = selectedBody.split('_')
          selectedBody = bodyArray[0] + '_' + bodyArray[1]+ '_' + tempColor;
          cancelAnimationFrame(animation);
          generate()
        }
        
        if (resultBody) {
          selectedBody = value + '_' + tempColor
          cancelAnimationFrame(animation);
          generate()
        }
        if (resultEyes) {
          selectedEyes = value
          cancelAnimationFrame(animation);
          generate()
        }
        if (resultNose) {
          selectedNose = value
          cancelAnimationFrame(animation);
          generate()
        }
        if (resultMouth) {
          selectedMouth = value
          cancelAnimationFrame(animation);
          generate()
        }
      })

    }


    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }


    //setting up feeding the rascal and the food object disappearing on collision with rascal body

    var crumbArray = []

    const createFood = async () => {

      // var animationcrumb

      var randomx = (2100 + Math.floor(Math.random()*800))
      var randomy = (2250 + Math.floor(Math.random()*500))

      while (randomx > (rascal.position.x-250) && randomx < (rascal.position.x+250) && randomy > (rascal.position.y-200) && randomy < (rascal.position.y+200)) {
        var randomx = (2100 + Math.floor(Math.random()*800))
        var randomy = (2250 + Math.floor(Math.random()*500))
      }

      var food = Matter.Bodies.circle(randomx, randomy, 35, {
        label: 'food',
        friction: 0.8,
        animation: 'animation',
        render: {
          visible: false
        }
      })

      crumbArray.push(food)

      Matter.World.add(engine.world, food)

      var randomFood = Math.ceil(Math.random()*6)

      const foodImage = await new Promise((resolve, reject) => {
        const foodImage = new Image();
        foodImage.onload = () => resolve(foodImage);
        foodImage.onerror = reject;
        foodImage.src = `./assets/crumb${randomFood}.png`;
      });

      const w = 100;
      const h = 100;
      let frameNumberfood = 0;


      (function rerender() {
        const foodOffset = (~~frameNumberfood * w) % foodImage.width;
        const { x, y } = food.position;
        ctx.drawImage(
          foodImage, // image
          foodOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          w, // dWidth
          h // dHeight
        );
        // Matter.Engine.update(engine);
        food.animation = requestAnimationFrame(rerender);
      })();
    }

    function detectFoodCollision(pair) {
      var condition1 = pair.bodyA.label === "food" && pair.bodyB.label === "rascal-body";
      var condition2 = pair.bodyA.label === "rascal-body" && pair.bodyB.label === "food";
      return condition1 || condition2
    }

    function onFoodCollision(pair) {
      if (pair.bodyA.label === "food") {
        Matter.World.remove(world, pair.bodyA);
        cancelAnimationFrame(pair.bodyA.animation)
      }
      if (pair.bodyB.label === "food") {
        Matter.World.remove(world, pair.bodyB);
        cancelAnimationFrame(pair.bodyB.animation)
      }
    }

    function setUpFeedRascal() {
      var totalCollisions = 0
      Matter.Events.on(engine, "collisionStart", (event) => {
        event.pairs
        .filter((pair) => {
          return detectFoodCollision(pair);
        })
        .forEach((pair) => {
          onFoodCollision(pair);
          totalCollisions++
        });
      });
      delay(11000).then(() => endFeed(totalCollisions))
    }

    function endFeed(totalCollisions) {
      ongoingRascal.food = totalCollisions
      for (let i = 0; i < crumbArray.length; i++) {
        Matter.World.remove(world,crumbArray[i])
        cancelAnimationFrame(crumbArray[i].animation)
      }
      crumbArray = []
      myContext.setRascalBodySave({...ongoingRascal})
      ongoingRascal.food=0
    }

    const feedRascal = () => {
      if (ongoingRascal.coins >= 20) {
        ongoingRascal.coins = (ongoingRascal.coins - 20);
      //   myContext.coins = (myContext.coins - 20);
        for (let i = 0; i < 50; i++) {
          delay(200*i).then(() => createFood())
        }
        // setUpFeedRascal();
      // } else {
      //   this.props.setOpenFail(true)
      }
    }

    const feedBtn = document.getElementById('FeedRascal')
    if (feedBtn) {
      feedBtn.addEventListener('click', () => {
        for (let i = 0; i < world.bodies.length; i++) {
          if (world.bodies[i].label === 'food') {
            return
          }
        }
        // feedRascal();
      })
    }
    
    var soap
    
    //setting up washing rascal and the soap getting smaller on collision 
    const createSoap = async () => {
      soap = Matter.Bodies.rectangle(2150, 2500, 185, 115, {
        label: 'soap',
        friction: 1,
        // isSensor: true,
        render: {
          visible: false,
        },
      })
      Matter.World.add(engine.world, soap)

      var soapSource = "soapbar";

      // cancelAnimationFrame(animation);
      const soapImage = await new Promise((resolve, reject) => {
        const soapImage = new Image();
        soapImage.onload = () => resolve(soapImage);
        soapImage.onerror = reject;
        soapImage.src = `./assets/${soapSource}.png`;
      });

      const w = 200;
      const h = 200;
      let frameNumberSoap = 0;


      (function rerender() {
        const soapOffset = (~~frameNumberSoap * w) % soapImage.width;
        const { x, y } = soap.position;
        ctx.drawImage(
          soapImage, // image
          soapOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          w, // dWidth
          h // dHeight
        );
        // Matter.Engine.update(engine);
        animationsoap = requestAnimationFrame(rerender);

      })();
    }

    var ducky

    const createDucky = async () => {
      ducky = Matter.Bodies.circle(2850, 2500, 80, {
        label: 'ducky',
        friction: 1,
        render: {
          visible: false,
        },
      })
      Matter.World.add(engine.world, ducky)

      // cancelAnimationFrame(animation);
      const duckyImage = await new Promise((resolve, reject) => {
        const duckyImage = new Image();
        duckyImage.onload = () => resolve(duckyImage);
        duckyImage.onerror = reject;
        duckyImage.src = `./assets/rubber_duck.png`;
      });

      const w = 200;
      const h = 200;
      let frameNumberDucky = 0;


      (function rerender() {
        const duckyOffset = (~~frameNumberDucky * w) % duckyImage.width;
        const { x, y } = ducky.position;
        ctx.drawImage(
          duckyImage, // image
          duckyOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          w, // dWidth
          h // dHeight
        );
        // Matter.Engine.update(engine);
        animationducky = requestAnimationFrame(rerender);

      })();
    }

    const createBubble = async (soappos) => {
      var bubble = Matter.Bodies.circle(soappos.x, soappos.y, 30, {
        label: 'bubble',
        frictionAir: 0.8,
        render: {
          visible: false,
        },
        collisionFilter: {
          group: bubblecrumbgroup
        },
      })
      Matter.World.add(engine.world, bubble)

      var animationbubble

      var randomBubble = Math.ceil(Math.random()*3)

      // cancelAnimationFrame(animation);
      const bubbleImage = await new Promise((resolve, reject) => {
        const bubbleImage = new Image();
        bubbleImage.onload = () => resolve(bubbleImage);
        bubbleImage.onerror = reject;
        bubbleImage.src = `./assets/bubble${randomBubble}.png`;
      });

      const w = 100;
      const h = 100;
      let frameNumberBubble = 0;

      (function rerender() {
        const bubbleOffset = (~~frameNumberBubble * w) % bubbleImage.width;
        const { x, y } = bubble.position;
        ctx.drawImage(
          bubbleImage, // image
          bubbleOffset, // sx
          0, // sy
          w, // sWidth
          h, // sHeight
          x - w / 2, // dx
          y - h / 2, // dy
          w, // dWidth
          h // dHeight
        );
        // Matter.Engine.update(engine);
        animationbubble = requestAnimationFrame(rerender);
        delay(1250 + Math.floor(Math.random()*500)).then(()=>cancelAnimationFrame(animationbubble))

      })();
    }

    function soapsplosion() {
      for (let i = 0; i < 5; i++) {
        delay(30*i).then(() => {
          var x = (soap.position.x - 35 + Math.floor(Math.random()*70))
          var y = (soap.position.y - 25 + Math.floor(Math.random()*50))
          var soapprox = {x, y}
          createBubble(soapprox)
        })
      }
    }

    function detectSoapCollision(pair) {
      var condition1 = pair.bodyA.label === "soap" && pair.bodyB.label === "rascal-body";
      var condition2 = pair.bodyA.label === "rascal-body" && pair.bodyB.label === "soap";
      return condition1 || condition2
    }


    function setUpWashRascal() {
      var totalCollisions = 0;
      // var washFinished = false
      Matter.Events.on(engine, 'collisionEnd', function (event) {
        event.pairs
        .filter((pair) => {
          return detectSoapCollision(pair);
        })
        .forEach((pair) => {
          totalCollisions++
          createBubble(soap.position)
        })
      })
      delay(7500).then(() => endWash(totalCollisions,soap))
    }

    function endWash(totalCollisions,soap) {
      soapsplosion()
      Matter.World.remove(world,soap)
      cancelAnimationFrame(animationsoap)
      Matter.World.remove(world,ducky)
      cancelAnimationFrame(animationducky)
      ongoingRascal.suds = totalCollisions
      myContext.setRascalBodySave({...ongoingRascal})
      ongoingRascal.sud=0
    }

    const washRascal = () => {
      if (ongoingRascal.coins >= 10) {
        ongoingRascal.coins = (ongoingRascal.coins - 10);
        ongoingRascal.washed = true
        
        myContext.setRascalBodySave({...ongoingRascal})
        ongoingRascal.washed = false
  
        createSoap();
        createDucky();
        setUpWashRascal();
      } else { this.props.setOpenFail(true) }
    }

    const soapBtn = document.getElementById('WashRascal')
    if (soapBtn) {
      soapBtn.addEventListener('click', () => {
        for (let i = 0; i < world.bodies.length; i++) {
          if (world.bodies[i].label === 'soap') {
            return
          }
        }
        washRascal();
      })
    }

  }

  render() {
    return (
      <>
        <div ref="scene" id="canvas_container" />
      </>
    )
  }
}
export default Scene;