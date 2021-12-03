import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";
import "./style.css"


class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      if (window.innerWidth>=window.innerHeight){
        Mouse.setScale(mouse, {x: window.innerWidth/window.innerHeight, y: 1})
        Mouse.setOffset(mouse, {x: 2500-(2500*(window.innerWidth/window.innerHeight)), y: 0})
      } else {
        Mouse.setScale(mouse, {x: 1, y: window.innerHeight/window.innerWidth})
        Mouse.setOffset(mouse, {x: 0, y: 2500-(2500*(window.innerHeight/window.innerWidth))})
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
    var item1
    var item2
    var item3
    var item4
    var item5
    var item6
    var item7
    var item8
    var selectedBody = this.props.myRascal.body || "empty";

    var selectedEyes = this.props.myRascal.eyes || "empty";

    var selectedMouth = this.props.myRascal.mouth || "empty";

    var selectedNose = this.props.myRascal.nose || "empty";

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
    canvas.setAttribute('id','rascalCanvas')
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

      
        if(itemArray[0]){
          item1 = Bodies.rectangle(
            2500,
            2340 - 1 - 50 * (itemArray[0].size - 1),
            90,
            100 * itemArray[0].size,
            {
              name: itemArray[0].name,
              frictionAir: 0.06,
              friction: 0,
              render: {//TODO this breaks the site
                sprite: {
                  texture: `./assets/${itemArray[0].name}.png`
                }
              }
            }
          );
            equippedItems.push(item1)//equippedItems array is only used for devMode
  
          var itemConstraint = Constraint.create({
            name: `${itemArray[0].name}_constraint`,
            pointA: rascal.position,
            bodyB: item1,
            pointB: { x: 0, y: itemArray[0].size / 0.02 },
            stiffness: 0.05,
            render: {
              visible: false,
            },
          });  
          Composite.add(world, [item1, itemConstraint]);
        }
        if(itemArray[1]){
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
  
          var itemConstraint = Constraint.create({
            name: `${itemArray[1].name}_constraint`,
            pointA: rascal.position,
            bodyB: item2,
            pointB: { x: 0, y: itemArray[1].size / 0.02 },
            stiffness: 0.05,
            render: {
              visible: false,
            },
          });  
          Composite.add(world, [item2, itemConstraint]);
        }
        if(itemArray[2]){
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
  
          var itemConstraint = Constraint.create({
            name: `${itemArray[2].name}_constraint`,
            pointA: rascal.position,
            bodyB: item3,
            pointB: { x: 0, y: itemArray[2].size / 0.02 },
            stiffness: 0.05,
            render: {
              visible: false,
            },
          });  
          Composite.add(world, [item3, itemConstraint]);
        }
        if(itemArray[3]){
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
  
          var itemConstraint = Constraint.create({
            name: `${itemArray[3].name}_constraint`,
            pointA: rascal.position,
            bodyB: item4,
            pointB: { x: 0, y: itemArray[3].size / 0.02 },
            stiffness: 0.05,
            render: {
              visible: false,
            },
          });  
          Composite.add(world, [item4, itemConstraint]);
        }
        if(itemArray[4]){
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
  
          var itemConstraint = Constraint.create({
            name: `${itemArray[4].name}_constraint`,
            pointA: rascal.position,
            bodyB: item5,
            pointB: { x: 0, y: itemArray[4].size / 0.02 },
            stiffness: 0.05,
            render: {
              visible: false,
            },
          });  
          Composite.add(world, [item5, itemConstraint]);
        }
        if(itemArray[5]){
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
  
          var itemConstraint = Constraint.create({
            name: `${itemArray[5].name}_constraint`,
            pointA: rascal.position,
            bodyB: item6,
            pointB: { x: 0, y: itemArray[5].size / 0.02 },
            stiffness: 0.05,
            render: {
              visible: false,
            },
          });  
          Composite.add(world, [item6, itemConstraint]);
        }
        if(itemArray[6]){
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
  
          var itemConstraint = Constraint.create({
            name: `${itemArray[6].name}_constraint`,
            pointA: rascal.position,
            bodyB: item7,
            pointB: { x: 0, y: itemArray[6].size / 0.02 },
            stiffness: 0.05,
            render: {
              visible: false,
            },
          });  
          Composite.add(world, [item7, itemConstraint]);
        }
        if(itemArray[7]){
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
  
          var itemConstraint = Constraint.create({
            name: `${itemArray[7].name}_constraint`,
            pointA: rascal.position,
            bodyB: item8,
            pointB: { x: 0, y: itemArray[7].size / 0.02 },
            stiffness: 0.05,
            render: {
              visible: false,
            },
          });  
          Composite.add(world, [item8, itemConstraint]);
        }
      }
      // //test one: spawns arm on right side of body
      //     var item = Bodies.rectangle(985.8227253725269, 591.5253089907833, 90, (100 * 1.5), {
      //         name: 'test',
      //         frictionAir: 0.06,
      //         friction: 0,
      //         angle: 1.569390697291188,
      //         render: {
      //             sprite: {
      //                 texture: `./assets/party_hat.png`
      //             }
      //         }
      //     })

      //     // Body.rotate(item,90)

      // var itemConstraint = Constraint.create({
      //     pointA: rascal.position,
      //     bodyB: item,
      //     pointB: {x: -74.99992647502606, y: 0.10501781127428417},
      //     stiffness: 0.05
      // });

      // Composite.add(world, [
      //     item,
      //     itemConstraint
      // ]);
    
    addItems();

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

    const changeSelections = ()=> {
      selectedBody = this.props.myRascal.body || "empty";

      selectedEyes = this.props.myRascal.eyes || "empty";
  
      selectedMouth = this.props.myRascal.mouth || "empty";
  
      selectedNose = this.props.myRascal.nose || "empty";
  
      itemArray = [...this.props.equippedItems
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
      if (checkBox.checked == true){
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
              equippedItems[i].render.sprite = {xScale: 1, yScale: 1, xOffset: 0.5, yOffset: 0.5, texture: `./assets/${equippedItems[i].name}.png`}
          }
          generate()
      }
    }
    console.log(item1)
    const equippedItemsPanel = document.querySelector('#equipped-items')
    equippedItemsPanel.addEventListener("click",(e)=>{
      
      var source = e.target.getAttribute('src')
      // console.log(e.target)
      if(source){
        
        var isolate = source.split('/')[2].split('.')[0]
        console.log(isolate)
        world.bodies.forEach((item,index) => {
          if(item.name==isolate){
            Matter.World.remove(world,world.bodies[index])
            return
          }
          
        });
        // if(isolate=="nose_disguise" || "nose_cute"){
        //   console.log(world)
        //   selectedNose=isolate
        //   // selectedBody="body_curly"
        //   cancelAnimationFrame(animation);
        //   generate()
        // }

      }
    })
    // document.addEventListener('click',function(e){
    //   console.log(world)
    //   world.bodies.forEach((item,index) => {
    //     if(index>0){
    //       Matter.World.remove(world,item)
    //     }
    //   });
    //   world.bodies.forEach((item,index) => {
    //     if(index>0){
    //       Matter.World.remove(world,item)
    //     }
    //   });
    //   // for (let index = 0; index < world.bodies.length; index++) {
    //   //   const element = world.bodies[index];
    //   //   if(index>0){
    //   //     Matter.World.remove(world,element)
    //   //   }
        
    //   // }
    //   // Matter.World.remove(world,world.bodies[0])
    //   cancelAnimationFrame(animation);

    //   generate();
    // })
  }
  
  render() {
    return (
      <>
      
      <div ref="scene" id="canvas_container"/>
      </>
    )
  }
}
export default Scene;