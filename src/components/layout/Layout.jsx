import React from 'react'
import { useLocation, useMatches, useOutlet } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

import './layout.scss';
import vision from '../../resources/vision.png';
import { CSSTransition, SwitchTransition, } from 'react-transition-group';


export const Layout = () => {
  const location = useLocation();
  const matches = useMatches();
  const currentOutlet = useOutlet()

  return (
        <div className="app">
            <AppHeader/>
            <main>
              <SwitchTransition>
                <CSSTransition
                 location={location}
                  key={location.pathname}
                  timeout={{
                    enter: 500,
                    exit: 0,
                   }}
                  classNames="page"
                  unmountOnExit
                >
                  {(state) => (
                    <div className="page">
                      <React.Suspense fallback={<Spinner />}>
                        {currentOutlet}
                      </React.Suspense>
                    </div>
                  )} 
                </CSSTransition>
              </SwitchTransition>
            </main>
              {matches[1].id !== '0-4'? <img className="bg-decoration" src={vision} alt="vision"/> : null}
        </div>
  )
}
