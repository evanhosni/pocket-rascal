import React, { useContext } from "react";
import Navigation from '../../Navigation';
import Chip from '@mui/material/Chip';
import AppContext from "./../../AppContext";


export default function MiniTopBar({ userId }) {

    const myContext = useContext(AppContext);


    return (
        <div style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'black', width: '100%' }}>
            <div style={{ width: '1%', maxWidth: 55, textAlign: 'left' }} />
            <div style={{ width: '100%', maxWidth: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '0.5%' }}>
                <Chip sx={{ color: 'white', background: 'transparent' }} label={`Total Earnings: ${myContext.earnings}¢`} />

            </div>
            <div style={{ width: 55, textAlign: 'right', marginRight: '1%' }}>
                <Navigation userId={userId} />
            </div>

        </div>


    )
}