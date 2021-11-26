import React from 'react';

import StatusBar from './StatusBars'
import BottomNav from './BottomNav';
import Scene from '../../Scene'

export default function Dashboard() {
  return (
    <div>
      <div>
      <StatusBar />

      </div>
      <div>
        <Scene />
      </div>
      <div>
        <BottomNav />

      </div>
      
    </div>
  );
}