import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { logo, search, user } from '../assets';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full px-[50px] py-4 mx-auto">
      
      {/* Logo a la izquierda */}
      <Link to="/" className="flex-shrink-0">
        <img src={logo} alt="logo" className="w-[50px] h-[50px] object-contain" />
      </Link>

      {/* Barra de búsqueda y botón en el centro */}
      <div className="flex flex-1 justify-center items-center gap-4 max-w-[750px]">
        <div className="flex-1 max-w-[458px] flex flex-row items-center py-2 px-2 bg-[#1c1c24] rounded-full">
          <input
            type="text"
            placeholder="Search for campaigns"
            className="flex w-full text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none ml-2"
          />
          <div className="w-[60px] h-[36px] rounded-full bg-[#024CAA] flex justify-center items-center cursor-pointer ml-2">
            <img src={search} alt="search" className="w-[18px] h-[18px] object-contain" />
          </div>
        </div>

        <CustomButton
          btnType="button"
          title="Create a Campaign"
          styles="bg-[#024CAA] px-3 py-1 text-[14px] rounded-full"
          handleClick={() => navigate('create-campaign')}
        />
      </div>

      {/* Perfil a la derecha */}
      <Link to="/profile" className="flex-shrink-0">
        <div className="w-[50px] h-[50px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={user} alt="user" className="w-[100%] h-[100%] object-contain" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;

