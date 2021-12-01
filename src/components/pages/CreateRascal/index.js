import React from "react";
import StepCreate from "./StepCreate";
// import TabCreate from './TabCreate'

const CreateRascal = (props) => {
return (
    <div>
        <StepCreate setMyRascal={props.setMyRascal} setRascalLimbArray={props.setRascalLimbArray}/>

    </div>
)

}

export default CreateRascal;