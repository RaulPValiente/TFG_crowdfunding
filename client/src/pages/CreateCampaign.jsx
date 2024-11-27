import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../state';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../helpers';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Invalid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="bg-black/60 border border-white/20 w-[1200px] flex justify-center items-center flex-col rounded-lg sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] flex-col">
        <h1 className="flex-1 font-bold sm:text-[30px] text-[20px] leading-[38px] text-white">
          New Campaign
        </h1>
        <h2 className="flex-1 sm:text-[15px] text-[10px] leading-[38px] text-white/70">
          Take Your Project to the Next Level
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[30px] flex flex-col gap-[30px]"
      >
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
            title="Submit Campaign"
            styles="bg-gradient-to-r from-[#785dc7] to-[#4a34a5] px-3 py-1 text-[14px] rounded-lg border border-white/20 hover:bg-gradient-to-l hover:from-[#9d80ff] hover:to-[#6b4fcf]"
          />
        </div>
      </form>
      <style>
        {`
          input[type="date"] {
            color: white; /* Cambia el color del texto y el ícono del selector */
            background-color: transparent; /* Asegura el fondo transparente */
            border: 1px solid #3a3a43; /* Define bordes visibles */
            padding: 10px;
            border-radius: 5px;
          }

          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1); /* Invertir el color del ícono para mejor contraste */
          }
        `}
      </style>
    </div>
  );
};

export default CreateCampaign;
