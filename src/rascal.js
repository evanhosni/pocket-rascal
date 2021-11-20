import Matter from 'matter-js'

///devMode for testing only
var devModeActive;
function devMode() {
    var checkBox = document.getElementById("devMode");
    if (checkBox.checked == true){
        devModeActive = true
        cancelAnimationFrame(animation)
        rascal.render.visible = true
        for (let i = 0; i < equippedLimbs.length; i++) {
            equippedLimbs[i].render.sprite = 0
        }
    } else {
        devModeActive = false
        cancelAnimationFrame(animation)
        rascal.render.visible = false
        for (let i = 0; i < equippedLimbs.length; i++) {
            equippedLimbs[i].render.sprite = {xScale: 1, yScale: 1, xOffset: 0.5, yOffset: 0.5, texture: `./assets/${equippedLimbs[i].name}.png`}
        }
        generate()
    }
  }
///end of devMode section
//////////////////////////////////////////////////////////////////////////////////
///Initiation of matterjs engine
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    // Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var engine = Engine.create({ // create an engine
//    render: {
//        options: {
//            height: 600,
//            width: 800
//        }
//    }
}),
    world = engine.world;

var render = Render.create({// create a renderer
    element: this.refs.scene,
    engine: engine,
    options: {wireframes: false}
});

Render.run(render);// run the renderer

var runner = Runner.create();// create runner

Runner.run(runner, engine);// run the engine


///end of Initiation section
//////////////////////////////////////////////////////////////////////////////////
///Define Globals (rascal body, mouse constraints, etc)

var mouse = Mouse.create(render.canvas),// add mouse control
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
render.mouse = mouse;// keep the mouse in sync with rendering

var rascal = Bodies.polygon(800, 600, 8, 120, {
    name: "rascal",
    inertia: 'Infinity',
    frictionAir: 0.2,
    friction: 0,
    render: {
        visible: false
    }
});
var rascalConstraint = Constraint.create({
    name: "rascal_constraint",
    pointA: { x: 800, y: 600 },
    bodyB: rascal,
    pointB: { x: 0, y: 0 },
    stiffness: 0.02
});

///end of Define Globals section
//////////////////////////////////////////////////////////////////////////////////
///Set Variables

var selectedBody = "body_default"

var selectedEyes = "eyes_tired"

var selectedNose = "nose_disguise"

var limbArray = [
    {name: 'party_hat', size: 1.7},
    {name: 'arm_default', size: 2.8},
    {name: 'arm_default', size: 2.8},
    // {name: 'waffle_cone', size: 1.7}
]

///end of Set Variables section
//////////////////////////////////////////////////////////////////////////////////
///Generate Rascal and Face components

var animation
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// setInterval(function(){ 
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
// }, 1);

const generate = async () => {
    const bodyImage = await new Promise((resolve, reject) => {
        const bodyImage = new Image();
        bodyImage.onload = () => resolve(bodyImage);
        bodyImage.onerror = reject;
        bodyImage.src = `./assets/${selectedBody}.png`;
        bodyImage.id = "bruh"
    });
    const eyesImage = await new Promise((resolve, reject) => {
        const eyesImage = new Image();
        eyesImage.onload = () => resolve(eyesImage);
        eyesImage.onerror = reject;
        eyesImage.src = `./assets/${selectedEyes}.png`;
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
        const noseOffset = (~~frameNumber * w) % noseImage.width;
        const eyesOffset = (~~frameNumber * w) % eyesImage.width;
        const {x, y} = rascal.position;
        ctx.drawImage(
            bodyImage,      // image
            bodyOffset,     // sx
            0,         // sy
            w,          // sWidth
            h,          // sHeight
            x - w / 2,  // dx
            y - h / 2,  // dy
            w,          // dWidth
            h           // dHeight
            );
        ctx.drawImage(
            eyesImage,      // image
            eyesOffset,     // sx
            0,         // sy
            w,          // sWidth
            h,          // sHeight
            x - w / 2,  // dx
            y - h / 2,  // dy
            w,          // dWidth
            h           // dHeight
            );
        ctx.drawImage(
            noseImage,      // image
            noseOffset,     // sx
            0,         // sy
            w,          // sWidth
            h,          // sHeight
            x - w / 2,  // dx
            y - h / 2,  // dy
            w,          // dWidth
            h           // dHeight
            );
        frameNumber += 0.1;
        // Matter.Engine.update(engine);
        animation = requestAnimationFrame(rerender);
    })();
};
Composite.clear(world)
Composite.add(world, [mouseConstraint,rascal,rascalConstraint]);
generate();
addLimbs();

//end of Generate Rascal and Face components section
//////////////////////////////////////////////////////////////////////////////////
///Add Limbs

var equippedLimbs//equippedLimbs array is only used for devMode

function addLimbs() {

    equippedLimbs = []//equippedLimbs array is only used for devMode

    for (let i = 0; i < limbArray.length; i++) {

        var limb = Bodies.rectangle(800, (440 - 1 - 50*(limbArray[i].size - 1)), 90, (100 * limbArray[i].size), {
            name: limbArray[i].name,
            frictionAir: 0.06,
            friction: 0,
            render: {
                sprite: {
                    texture: `./assets/${limbArray[i].name}.png`
                }
            }
        })
        equippedLimbs.push(limb)//equippedLimbs array is only used for devMode
        
        var limbConstraint = Constraint.create({
            name: `${limbArray[i].name}_constraint`,
            pointA: rascal.position,
            bodyB: limb,
            pointB: { x: 0, y: (limbArray[i].size / 0.02) },
            stiffness: 0.05
        });
    
        Composite.add(world, [
            limb,
            limbConstraint
        ]);
    }


    // //test one: spawns arm on right side of body
    //     var limb = Bodies.rectangle(985.8227253725269, 591.5253089907833, 90, (100 * 1.5), {
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

    //     // Body.rotate(limb,90)
    
    // var limbConstraint = Constraint.create({
    //     pointA: rascal.position,
    //     bodyB: limb,
    //     pointB: {x: -74.99992647502606, y: 0.10501781127428417},
    //     stiffness: 0.05
    // });

    // Composite.add(world, [
    //     limb,
    //     limbConstraint
    // ]);
}

///end Add Limbs section
//////////////////////////////////////////////////////////////////////////////////
///Check Coordinates of all limbs

function checkCoor() {
    var bodies = Composite.allBodies(world);
    var constraints = Composite.allConstraints(world)
    for (var i = 0; i < bodies.length; i++) {
        console.log(bodies[i].name,bodies[i].position,bodies[i].angle)
    }
    for (var i = 0; i < constraints.length; i++) {
        console.log(constraints[i].name,constraints[i].pointB)
    }
}


function changeSelections() {
    selectedBody = "body_curly"
    cancelAnimationFrame(animation)
    generate()
}