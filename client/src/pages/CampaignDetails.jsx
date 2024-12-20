import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../state';
import { Data, CustomButton, Loader } from '../components';
import { BarPercentage, daysLeft } from '../helpers';
import { user2 } from '../assets';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate('/');
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-lg"
          />
          <div className="relative w-full h-[10px] bg-[#3a3a43] mt-3 rounded-sm">
            <div
              className="absolute h-full bg-[#00bb2d] rounded-sm"
              style={{
                width: `${BarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <Data title="Days Left" value={remainingDays} />
          <Data
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <Data title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[20px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[30px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full cursor-pointer">
                <img
                  src={user2}
                  alt="user"
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Description
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Investors
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] truncate max-w-[200px] sm:max-w-none">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px]">
                      {item.donation} ETH
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No investors yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 lg:ml-20 mt-[20px] flex flex-col p-4 bg-black/60 border border-white/10 rounded-[10px]">
          <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-white">
            Start Investing
          </p>
          <div className="mt-[30px]">
            <input
              type="number"
              placeholder="0.1 ETH"
              step="0.01"
              className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-bold text-[16px] leading-[24px] text-white">
                Invest and Earn 💸
              </h4>
              <p className="mt-[10px] font-epilogue font-normal text-[14px] leading-[20px] text-[#808191]">
                Unlock the power of passive income by supporting innovative
                projects.
              </p>
            </div>

            <CustomButton
              btnType="button"
              title="Fund Campaign"
              styles="w-full h-11 bg-gradient-to-r from-[#785dc7] to-[#4a34a5] rounded-lg hover:bg-gradient-to-l hover:from-[#9d80ff] hover:to-[#6b4fcf] shadow border border-white cursor-pointer"
              handleClick={handleDonate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
