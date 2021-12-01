import React from 'react';

import StatusBar from './StatusBars'
import BottomNav from './BottomNav';
import Scene from './Scene'

export default function Dashboard({currentPage,handlePageChange}) {
  return (
    <div>
      <div>
      <StatusBar currentPage={currentPage} handlePageChange={handlePageChange}/>

      </div>
      <div>
        <Scene />
      </div>
      <div>
        <BottomNav currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
      
    </div>
  );
}