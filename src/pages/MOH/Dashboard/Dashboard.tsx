import CustomCard from '../../../components/CustomCard';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../api/apiRequests';
import { Dropdown, MenuProps, Space, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import ChartOne from '../../../components/ChartOne';
import ChartThree from '../../../components/ChartThree';
import MapOne from '../../../components/MapOne';

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [activeUsers, setActiveUsers] = useState(0)
  const [total, setTotal] = useState()
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };


  const usersQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsers(),
  })

  useEffect(() => {
    if (usersQuery.isSuccess) {
      setUsers(usersQuery.data)
      const active = usersQuery.data.filter((user: any) => user.status === 'active');
      setActiveUsers(active)
    }
  }, [usersQuery.isSuccess, usersQuery.data]);



  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.success(`selected   ${key}`);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Hotspot',
      key: '1',
    },
    {
      label: 'Health Facility',
      key: '2',
    },
    {
      label: 'Public Sector',
      key: '3',
    },
  ];



  const cardData = [
    {
      id: 1,
      amount: users.length || 0,
      text: "Total Users",
      // percentage: 0.43
    },
    {
      id: 2,
      amount: activeUsers?.length || 0,
      text: "Active Users",
      // percentage: 0.43
    },
    {
      id: 3,
      amount: users.length - activeUsers?.length || 0,
      text: "In active",
      // percentage: 0.43
    },

  ]


  const dataObj = [
    {
      id: 1,
      amount: users.length - activeUsers?.length || 0,
      text: "Total  Ath Hand",
      // percentage: 0.43
    },
    {
      id: 2,
      amount: users.length - activeUsers?.length || 0,
      text: "Total Condoms Used",
      // percentage: 0.43
    }

  ]

  const customBorderStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    border: '2px solid #000',
    borderRadius: '8px', // Adjust the border radius to make it as round as you want
    padding: '8px',
    transition: 'border-color 0.3s ease-in-out', // Add a smooth transition for the border color change
    outline: 'none', // Remove the default outline on focus
    cursor: 'pointer',
  };

  const focusBorderStyle = {
    borderColor: '#007bff', // Adjust the color for the focused border
  };



  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        {cardData.map(({ amount, text, percentage, id }) => <CustomCard key={id} amount={amount} title={text} percentage={percentage} currency={''} />)}


      </div>
      <div className='flex justify-between items-center '>
        <h2 className='font-bold text-black  p-[rem] my-11 text-lg'>Condom Usage at National Level</h2>
        <Dropdown overlayStyle={{ border: "black" }} menu={{ items, onClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{
              ...customBorderStyle,
              ...(isFocused && focusBorderStyle), // Apply the focus border style when the component is focused
            }}
              tabIndex="0" // Make the component focusable
              onFocus={handleFocus}
              onBlur={handleBlur}>
              Select Sector
            </Space>
          </a>
        </Dropdown></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        {dataObj.map(({ amount, text, percentage, id }) => <CustomCard key={id} amount={amount} title={text} percentage={percentage} currency={''} />)}


      </div>
      <h2 className="font-bold text-black  my-11 text-lg">Condom Usage Visualizations</h2>

      <div className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        {/* <ChartTwo /> */}
        <ChartThree />
        <MapOne />
      </div>
    </>
  );
};

export default Dashboard;
