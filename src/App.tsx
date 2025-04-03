import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertsManagement from "./alerts-module";
import ArchitectureOverview from "./architecture-overview";
import HomeDashboard from "./home-dashboard";
import AdvancedSearch from "./search-module";
import Reports from "./Report/reports-module";
import MediaMonitoring from "./Media/media-monitoring-module";
import Navbar from "./component/navbar";

const App: FC = function () {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        {/* Integrated Navbar */}
        <Navbar />

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/homedash" element={<HomeDashboard />} />
            <Route path="/arch" element={<ArchitectureOverview />} />
            <Route path="/alerts" element={<AlertsManagement />} />
            <Route path="/search" element={<AdvancedSearch />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/media" element={<MediaMonitoring />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
