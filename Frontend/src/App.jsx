import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Dashboard from './Pages/DashBoard';
import History from './Pages/History';
import MLInsights from './Pages/MLInsights';
import CustomizeThresholds from './Pages/CustomizeThresholds';
import ThirdPartyControl from './Pages/ThirdPartyControl';
import './styles/PageTransitions.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient= new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();


  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/ml-insights" element={<MLInsights />} />
          <Route path="/customize-thresholds" element={<CustomizeThresholds />} />
          <Route path="/third-party-control" element={<ThirdPartyControl />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
      <QueryClientProvider client={queryClient}>
    <Router>
      <AnimatedRoutes />
    </Router>
      </QueryClientProvider>
  );
}

export default App;
