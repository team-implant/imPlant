import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from "./Pages/Login";
import Dashboard from "./Pages/DashBoard";
import History from "./Pages/History";
import MLInsights from "./Pages/MLInsights";
import CustomizeThresholds from "./Pages/CustomizeThresholds";
import ThirdPartyControl from "./Pages/ThirdPartyControl";
import "./styles/PageTransitions.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PlantGrowthGraph from "./components/graphs/PlantGrowthGraph";
import WateringScheduleGraph from "./components/graphs/WateringScheduleGraph";
import TemperatureGraph from "./components/graphs/TemperatureGraph";
import LightExposureGraph from "./components/graphs/LightExposureGraph";
import HumidityGraph from "./components/graphs/HumidityGraph";
import WaterPumpGraph from "./components/graphs/WaterPumpGraph";

import PlantGrowthPage from "./Pages/graphPages/PlantGrowthPage";
import WateringSchedulePage from "./Pages/graphPages/WateringSchedulePage";
import TemperaturePage from "./Pages/graphPages/TemperaturePage";
import LightExposurePage from "./Pages/graphPages/LightExposurePage";
import HumidityPage from "./Pages/graphPages/HumidityPage";
import WaterPumpPage from "./Pages/graphPages/WaterPumpPage";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/ml-insights" element={<MLInsights />} />
          <Route
            path="/customize-thresholds"
            element={<CustomizeThresholds />}
          />
          <Route path="/third-party-control" element={<ThirdPartyControl />} />

          {/* Graph routes */}
          <Route path="/graphs/plant-growth" element={<PlantGrowthPage />} />
          <Route
            path="/graphs/watering-schedule"
            element={<WateringSchedulePage />}
          />
          <Route path="/graphs/temperature" element={<TemperaturePage />} />
          <Route
            path="/graphs/light-exposure"
            element={<LightExposurePage />}
          />
          <Route path="/graphs/humidity" element={<HumidityPage />} />
          <Route path="/graphs/water-pump" element={<WaterPumpPage />} />

          {/* Catch-all route for 404s */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/">
        <AnimatedRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
