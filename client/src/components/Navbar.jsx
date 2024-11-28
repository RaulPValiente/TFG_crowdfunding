import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../state';
import { eth, user } from '../assets';
import { navlinks } from '../constants';
import { CustomButton } from './';

const Navbar = () => {
  const { connect, disconnect, address } = useStateContext();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWalletAction = () => {
    if (address) {
      disconnect();
    } else {
      connect();
    }
  };

  const handleNavigate = (name, link) => {
    setIsActive(name);
    navigate(link);
    setIsMenuOpen(false); // Cierra el menú al navegar
  };

  return (
    <div className="relative flex justify-between items-center w-full px-4 py-4 mx-auto lg:px-8">
      {/* Logo a la izquierda */}
      <div className="flex flex-1 justify-start">
        <Link to="/" className="flex-shrink-0">
          <img src={eth} alt="logo" className="w-[120px] sm:w-[150px] h-[40px] sm:h-[50px] object-cover" />
        </Link>
      </div>

      {/* Menú de hamburguesa en móvil y tablet */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-white text-2xl z-50" // Z-index para que el botón esté por encima del menú desplegable
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'} {/* Cambia el icono entre abrir y cerrar */}
        </button>
      </div>

      {/* Menú completo para pantallas grandes */}
      <div className="hidden lg:flex flex-1 justify-center items-center">
        <nav className="w-full flex justify-center">
          <div className="flex items-center rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(204,204,204,0.09)_20.17%,rgba(255,255,255,0.11)_100%)] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05),0px_4px_4px_0px_rgba(0,0,0,0.05),0px_10px_10px_0px_rgba(0,0,0,0.10)] backdrop-blur-[10px] gap-3 px-1 py-1">
            {navlinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (!link.disabled) {
                    handleNavigate(link.name, link.link);
                  }
                }}
                className={`text-white font-medium px-4 py-2 text-base leading-[20px] border transition-colors duration-200 ${
                  isActive === link.name ? 'border border-white/10 bg-[#2c2f32] rounded-full' : 'border-transparent rounded-full'
                } hover:bg-gray-200/10`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Botón y perfil a la derecha */}
      <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
        <CustomButton
          btnType="button"
          title={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
          styles={`h-11 px-5 py-2.5 rounded-full text-base shadow border border-white/30 backdrop-blur-[20px] justify-start items-center gap-2.5 inline-flex cursor-pointer group
            bg-gradient-to-r from-[#785dc7] to-[#4a34a5]
            hover:bg-gradient-to-l hover:from-[#9d80ff] hover:to-[#6b4fcf]`}
          handleClick={handleWalletAction}
        />

        <div
          className="flex-shrink-0"
          onClick={() => handleNavigate('Profile', '/profile')}
        >
          <div className="w-[50px] h-[50px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer hover:shadow-[0_0_15px_5px_rgba(120,93,199,0.6)] transition-shadow duration-300">
            <img src={user} alt="user" className="w-[100%] h-[100%] object-contain m-0 p-0" />
          </div>
        </div>
      </div>

      {/* Menú desplegable para móvil y tablet */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#05000f] text-white z-40 flex flex-col items-center justify-center gap-4">
          <CustomButton
            btnType="button"
            title={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
            styles="bg-gradient-to-r from-[#785dc7] to-[#4a34a5] px-4 py-2 rounded-lg w-[80%] text-center"
            handleClick={handleWalletAction}
          />
          <nav className="w-full flex flex-col items-center">
            {navlinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (!link.disabled) {
                    handleNavigate(link.name, link.link);
                  }
                }}
                className={`text-white font-medium px-4 py-2 text-lg w-[80%] rounded-lg text-center ${
                  isActive === link.name ? 'bg-[#2c2f32]' : ''
                } hover:bg-gray-800`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
