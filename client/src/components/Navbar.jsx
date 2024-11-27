import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { useStateContext } from '../state';
import { logo, search, user } from '../assets';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();
  

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
          <div className="w-[60px] h-[36px] rounded-full bg-[#785dc7] flex justify-center items-center cursor-pointer ml-2">
            <img src={search} alt="search" className="w-[18px] h-[18px] object-contain" />
          </div>
        </div>

        <CustomButton
  btnType="button"
  title={address ? 'Create a Campaign' : 'Connect Wallet'}
  styles={`h-11 pl-5 pr-5 py-2.5 rounded-lg shadow border border-white/30 backdrop-blur-[20px] justify-start items-center gap-2.5 inline-flex cursor-pointer group
    bg-gradient-to-r from-[#785dc7] to-[#4a34a5]
    hover:bg-gradient-to-l hover:from-[#9d80ff] hover:to-[#6b4fcf]`}
  handleClick={() => {
    if (address) navigate('create-campaign');
    else connect();
  }}
/>


      </div>

      {/* Perfil a la derecha con efecto de "halo" al hacer hover */}
      <Link to="/profile" className="flex-shrink-0">
        <div className="w-[50px] h-[50px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer hover:shadow-[0_0_15px_5px_rgba(120,93,199,0.6)] transition-shadow duration-300">
          <img src={user} alt="user" className="w-[100%] h-[100%] object-contain m-0 p-0" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;