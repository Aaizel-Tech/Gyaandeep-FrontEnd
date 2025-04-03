import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertsManagement from "./alerts-module";
import ArchitectureOverview from "./architecture-overview";
import HomeDashboard from "./Pages/home-dashboard";
import AdvancedSearch from "./search-module";
import Reports from "./Pages/reports-module";
import MediaMonitoring from "./Pages/media-monitoring-module";
import KeywordPage from "./Support/keywords";

import Navbar from "./component/navbar";

const App: FC = function () {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Integrated Navbar */}
        <Navbar />

        {/* Content area - added flex-1 to make it grow and fill remaining space */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/homedash" element={<HomeDashboard />} />
            <Route path="/arch" element={<ArchitectureOverview />} />
            <Route path="/alerts" element={<AlertsManagement />} />
            <Route path="/search" element={<AdvancedSearch />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/media" element={<MediaMonitoring />} />
            <Route path="/key" element={<KeywordPage />} />
            {/* <Route path="/faq" element={<FAQPage />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
