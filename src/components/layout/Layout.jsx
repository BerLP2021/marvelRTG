import React from 'react'
import { Outlet, useLocation, useMatches } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

import './layout.scss';
import vision from '../../resources/vision.png';
import { CSSTransition, SwitchTransition, } from 'react-transition-group';


export const Layout = () => {
  const location = useLocation();
  const matches = useMatches();
  
  return (
        <div className="app">
            <AppHeader/>
            <main>
              <SwitchTransition>
                <CSSTransition
                  key={location.pathname}
                  timeout={{
                    enter: 500,
                    exit: 300,
                   }}
                  classNames="page"
                  unmountOnExit
                >
                  {(state) => (
                    <div className="page">
                      <React.Suspense fallback={<Spinner />}>
                        <Outlet />
                      </React.Suspense>
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>  
            </main>
                {matches[1].id !== '0-3'? <img className="bg-decoration" src={vision} alt="vision"/> : null}
        </div>
  )
}
