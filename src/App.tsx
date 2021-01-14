import React, { RefObject, useState, FC } from 'react';

import SystemNavMenu from './components/system-nav-menu/SystemNavMenu';
import TheSystem from './components/the-system/TheSystem';
import AppContext, { SystemContext, systemSize } from './SystemContext';
import styles from './App.module.scss';

export interface PointOfInterest {
  ref: RefObject<HTMLDivElement>;
  display: string;
}

type SystemNames =
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'theBelt'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

export type PointsOfInterest = { [K in SystemNames]: PointOfInterest };

const pointsOfInterest: PointsOfInterest = {
  sun: {
    ref: React.createRef(),
    display: 'Sun',
  },
  mercury: {
    ref: React.createRef(),
    display: 'Mercury',
  },
  venus: {
    ref: React.createRef(),
    display: 'Venus',
  },
  earth: {
    ref: React.createRef(),
    display: 'Earth',
  },
  mars: {
    ref: React.createRef(),
    display: 'Mars',
  },
  theBelt: {
    ref: React.createRef(),
    display: 'The Belt',
  },
  jupiter: {
    ref: React.createRef(),
    display: 'Jupiter',
  },
  saturn: {
    ref: React.createRef(),
    display: 'Saturn',
  },
  uranus: {
    ref: React.createRef(),
    display: 'Uranus',
  },
  neptune: {
    ref: React.createRef(),
    display: 'Neptune',
  },
  pluto: {
    ref: React.createRef(),
    display: 'Pluto',
  },
};

const App: FC = () => {
  const [state, setState] = useState({
    systemSizeContext: systemSize.enhancedVisibility,
    orbitsVisible: false,
  });

  const onChangeSystemSize = (systemSizeContext: SystemContext): void => setState({ ...state, systemSizeContext });
  const onOrbitsVisibleChange = (orbitsVisible: boolean): void => setState({ ...state, orbitsVisible });

  const appClassName = state.orbitsVisible ? styles.orbitsVisible : '';

  return (
    <AppContext.Provider value={state.systemSizeContext}>
      <div className={appClassName}>
        <div className={styles.title}>
          <span>The System</span>
        </div>
        <SystemNavMenu
          pointsOfInterest={pointsOfInterest}
          orbitsVisible={state.orbitsVisible}
          onChangeSystemSize={onChangeSystemSize}
          onOrbitsVisibleChange={onOrbitsVisibleChange}
        />
        <TheSystem pointsOfInterest={pointsOfInterest} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
