import { Route, Routes } from 'react-router-dom';

import { CreateCampaign, Campaign, Home, Profile } from './pages';

import { Navbar } from './components';

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-col">
      
      <Navbar />

      
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<Campaign />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;