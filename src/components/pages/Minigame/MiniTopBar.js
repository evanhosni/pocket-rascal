import * as React from 'react';
import Navigation from '../../Navigation';
import Chip from '@mui/material/Chip';




export default function MiniTopBar({ currentPage, handlePageChange, userId, myRascal, logOut, earnedCoins, setEarnedCoins }) {


    return (
        <div style={{ paddingTop: 10, paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'black', width: '100%' }}>
            <div style={{ width: '1%', maxWidth: 55, textAlign: 'left' }} />
            <div style={{ width: '100%', maxWidth: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '0.5%' }}>
                <Chip sx={{ color: 'white', background: 'transparent' }} label={`Total Earnings: ${earnedCoins}¢`} />

            </div>
            <div style={{ width: 55, textAlign: 'right', marginRight: '1%' }}>
                <Navigation currentPage={currentPage} handlePageChange={handlePageChange} userId={userId} logOut={logOut} />
            </div>

        </div>


    )
}