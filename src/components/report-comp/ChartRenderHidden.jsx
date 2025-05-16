import React from 'react';
import CommunicativeSkillsChart from '../dash-comp/CommunicativeSkillsChart';
import SocialSkillsChart from '../dash-comp/SocialSkillsChart';

const ChartRenderHidden = ({ acumComunicativas, acumSociales }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      opacity: 0,
      zIndex: -1,
      pointerEvents: 'none'
    }}
  >
    <div id="com-chart" style={{ width: '600px', height: '390px' }}>
      <CommunicativeSkillsChart data={acumComunicativas} />
    </div>
    <div id="soc-chart" style={{ width: '600px', height: '390px' }}>
      <SocialSkillsChart data={acumSociales} />
    </div>
  </div>
);

export default ChartRenderHidden;
