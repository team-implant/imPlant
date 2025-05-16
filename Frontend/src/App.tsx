import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Login from './Pages/Login';
import Dashboard from './Pages/DashBoard';
import History from './Pages/History';
import MLInsights from './Pages/MLInsights';
import CustomizeThresholds from './Pages/CustomizeThresholds';
import ThirdPartyControl from './Pages/ThirdPartyControl';
import './styles/PageTransitions.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Import new graph components (commented out)
/*
import PlantGrowthGraph from './components/graphs/PlantGrowthGraph';
import WateringScheduleGraph from './components/graphs/WateringScheduleGraph';
import TemperatureGraph from './components/graphs/TemperatureGraph';
import LightExposureGraph from './components/graphs/LightExposureGraph';
import HumidityGraph from './components/graphs/HumidityGraph';
import WaterPumpGraph from './components/graphs/WaterPumpGraph';
*/

const queryClient= new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/ml-insights" element={<MLInsights />} />
          <Route path="/customize-thresholds" element={<CustomizeThresholds />} />
          <Route path="/third-party-control" element={<ThirdPartyControl />} />
          
          {/* New routes for ML Insights graphs (commented out) */}
          {/*
          <Route path="/graphs/plant-growth" element={<PlantGrowthGraph />} />
          <Route path="/graphs/watering-schedule" element={<WateringScheduleGraph />} />
          <Route path="/graphs/temperature" element={<TemperatureGraph />} />
          <Route path="/graphs/light-exposure" element={<LightExposureGraph />} />
          <Route path="/graphs/humidity" element={<HumidityGraph />} />
          <Route path="/graphs/water-pump" element={<WaterPumpGraph />} />
          */}
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