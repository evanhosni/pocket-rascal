import React from "react";
import StepCreate from "./StepCreate";
// import TabCreate from './TabCreate'

const CreateRascal = (props) => {
return (
    <div>
        <StepCreate setMyRascal={props.setMyRascal} equippedItems={props.equippedItems} unlockedItems={props.unlockedItems} setEquippedItems={props.setEquippedItems} setUnlockedItems={props.setUnlockedItems} handlePageChange={props.handlePageChange} userState={props.userState}/>

    </div>
)

}

export default CreateRascal;