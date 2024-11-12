import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// import { useStateContext } from '../context';
import { CustomButton, FormField, Loader } from '../components';
// import { checkIfImage } from '../helpers';

const CreateCampaign = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  }


  return (
    <div className="bg-black/60 border border-white/20 w-[1200px] flex justify-center items-center flex-col rounded-lg sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] flex-col">
        <h1 className="flex-1 font-bold sm:text-[30px] text-[20px] leading-[38px] text-white">New Campaign</h1>
        <h2 className="flex-1 sm:text-[15px] text-[10px] leading-[38px] text-white/70">Take Your Project to the Next Level</h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[30px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="Raúl Pérez"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Project Name *"
            placeholder="Enter your project name"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName="Description *"
            placeholder="Describe your project"
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Fundraise Goal *"
            placeholder="10 ETH"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField 
            labelName="Campaign Image *"
            placeholder="Provide the URL of an image for your project"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit Campaign ➕"
              styles="bg-black px-3 py-1 text-[14px] rounded-lg border border-white/20 hover:bg-[#080119]"
            />
          </div>
      </form>
    </div>
  )
}

export default CreateCampaign