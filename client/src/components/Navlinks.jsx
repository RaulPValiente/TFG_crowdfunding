import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navlinks } from '../constants';

const Navlinks = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('Home');

  return (
    <nav className="w-full pb-4 flex justify-center">
      <div className="flex items-center rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(204,204,204,0.09)_20.17%,rgba(255,255,255,0.11)_100%)] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05),0px_4px_4px_0px_rgba(0,0,0,0.05),0px_10px_10px_0px_rgba(0,0,0,0.10)] backdrop-blur-[10px] gap-3 px-1 py-1">
        {navlinks.map((link) => (
          <button
            key={link.name}
            onClick={() => {
              if (!link.disabled) {
                setIsActive(link.name);
                navigate(link.link);
              }
            }}
            className={`text-white font-medium px-4 py-2 text-[13px] leading-[20px] border transition-colors duration-200 ${
              isActive === link.name ? 'border border-white/10 bg-[#2c2f32] rounded-full' : 'border-transparent rounded-full'
            } hover:bg-gray-200/10`}
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;
