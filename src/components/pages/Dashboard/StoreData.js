

const bodyData = [
    {
        img: './assets/body_curly.png',
        title: 'Curly Body',
        price: 50,
        level: 0
    },
    {
        img: './assets/minibody.png',
        title: 'Fuzzy Body',
        price: 25,
        level: 0
    }
]

const eyeData = [
    {
        img: './assets/eyes_glasses.png',
        title: 'Glasses Eyes',
        price: 50,
        level: 0
    },
    {
        img: './assets/eyes_pretty.png',
        title: 'Cutesie Eyes',
        price: 50,
        level: 0
    },
    {
        img: './assets/eyes_tired.png',
        title: 'Tired Eyes',
        price: 25,
        level: 0
    }
]

const noseData = [
    {
        img: './assets/nose_cute.png',
        title: 'Button Nose',
        price: 50,
        level: 0
    },
    {
        img: './assets/nose_disguise.png',
        title: 'Nose Disguise',
        price: 25,
        level: 0
    }
]

const mouthData = [
    {
        img: './assets/mouth_simple.png',
        title: 'Simple Smirk',
        price: 50,
        level: 0
    },
]

const itemData = [
    {
        img: './assets/cherry.png',
        title: 'Cherry Hat',
        price: 50,
        level: 0
    },
    {
        img: './assets/party_hat.png',
        title: 'Party Hat',
        price: 50,
        level: 0
    },
    {
        img: './assets/top_hat.png',
        title: 'Top Hat',
        price: 50,
        level: 0
    },
    {
        img: './assets/waffle_cone.png',
        title: 'Waffle Cone',
        price: 50,
        level: 0
    },
    {
        img: './assets/arm_glove.png',
        title: 'Gloved Arms',
        price: 50,
        level: 0
    },
    {
        img: './assets/arm_default.png',
        title: 'Stick Arms',
        price: 25,
        level: 0
    }
]


function purchaseItem(value) {
    //function here to reduce total amount of coins after a purchase 
    console.log(value)

}

module.exports = { bodyData, eyeData, noseData, mouthData, itemData, purchaseItem }

