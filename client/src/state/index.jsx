import { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x138c4B5477E9a32faeC811772611b315421DF8C0');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
				args: [
					address,
					form.title,
					form.description,
					form.target,
					new Date(form.deadline).getTime(),
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  // getCampaigns function

  // getUserCampaigns function

  // donate function

  // getDonations function


  return (
    // return all data for the campaigns
    <div>return</div>
  )
}