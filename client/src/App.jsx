
import { Route, Routes } from 'react-router-dom';

import { Navbar, Navlinks } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';

const App = () => {
  return (
    <div className="sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-col">
      <div className="w-full">
        <Navbar />
        <Navlinks />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
