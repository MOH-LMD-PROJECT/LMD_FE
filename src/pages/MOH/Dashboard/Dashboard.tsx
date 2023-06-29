import { useEffect, useState } from 'react';
import ChartOne from '../../../components/ChartOne.tsx';
import ChartThree from '../../../components/ChartThree.tsx';
import ChartTwo from '../../../components/ChartTwo.tsx';
import CustomCard from '../../../components/CustomCard.tsx';
import MapOne from '../../../components/MapOne.tsx';
import Table from '../../../components/Table/index.tsx';
import axios from 'axios';
import { displayErrorMessage } from '../../../components/toast/Toast.ts';
const Dashboard = () => {
  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetchUsers()
  },[])
  const fetchUsers = async()=>{
    try {
      const {data} = await axios.get('http://192.168.0.157/clims/public/api/users')
      setUsers(data)
    } catch (error) {
      displayErrorMessage("An error occured try again later")
    }
  }

  const cardData = [
    {
      id: 1,
      currency: 'UGX',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    },
    {
      id: 2,
      currency: 'UGX',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    },
    {
      id: 3,
      currency: 'UGX',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    },
    {
      id: 4,
      currency: 'UGX',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    },
    {
      id: 5,
      currency: 'UGX',
      amount: 3213,
      text: "Total hotspots",
      percentage: 0.43
    }
  ]


  const data = [
    { name: 'John Doe', age: 25, address: '123 Main St' },
    { name: 'Jane Smith', age: 30, address: '456 Elm St' },
    { name: 'Bob Johnson', age: 40, address: '789 Oak St' },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        {cardData.map(({ currency, amount, text, percentage, id }) => <CustomCard key={id} currency={currency} amount={amount} text={text} percentage={percentage} />)}


      </div>
      <div className="col-span-12 xl:col-span-8 mt-10" >
      <Table data={users}/>
        </div>
      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
      </div> */}
    </>
  );
};

export default Dashboard;
