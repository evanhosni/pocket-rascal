import React, { useContext } from "react";
import Navigation from '../../Navigation';
import AppContext from "./../../AppContext";


export default function MiniTopBar({ userId }) {

    const myContext = useContext(AppContext);


    return (
        <div style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'black', width: '100%' }}>
            <div style={{ width: '1%', maxWidth: 55, textAlign: 'left' }} />
            <div style={{ width: 55, textAlign: 'right', marginRight: '1%' }}>
                <Navigation />
            </div>
        </div>
    )
}