import React from 'react';

interface CustomCardProps {
  title: string;
  amount: number;
  percentage: number;
}

const CustomCard: React.FC<CustomCardProps> = ({ amount, title }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center   ">
        <h3>{title}</h3>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {amount}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
