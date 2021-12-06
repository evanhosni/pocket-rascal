import React from 'react';
import MiniSelection from './Games/MiniSelection'
import MiniNav from './MiniNav';
import MiniTopBar from './MiniTopBar';

export default function MiniPlayground({userId}) {

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <MiniTopBar />
        <MiniSelection />
        <MiniNav />
    </div>
  );
}