import React from 'react';
import ChartOne from '../../../components/ChartOne';
import ChartThree from '../../../components/ChartThree';
import ChartTwo from '../../../components/ChartTwo';
import CustomCard from '../../../components/CustomCard';
import MapOne from '../../../components/MapOne';

import { useEffect, useState } from 'react';

import axios from 'axios';
import { displayErrorMessage } from '../../../components/toast/Toast';
const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [activeUsers, setActiveUsers] = useState(0)

//   useEffect(() => {
//     fetchUsers()
//   }, [])
//   const fetchUsers = async () => {
//     try {
//       const { data } = await axios.get('http://192.168.0.157/clims/public/api/users')
//       const activeUsers = users.filter((user:any) => user.status === 'active');
//       console.log(activeUsers)
//       const activeUsersCount:number = activeUsers.length
//       setActiveUsers(activeUsersCount)
//       setUsers(data)
//     } catch (error) {
//       displayErrorMessage("An error occured try again later")
//     }
//   }
// console.log(users)


  const cardData = [
    {
      id: 1,
      amount: users.length,
      text: "Total Users",
      // percentage: 0.43
    },
    {
      id: 2,
      amount: activeUsers,
      text: "Active Users",
      // percentage: 0.43
    },
    {
      id: 3,
      amount: users.length-activeUsers,
      text: "In active",
      // percentage: 0.43
    }
  ]



  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        {cardData.map(({amount, text, percentage, id }) => <CustomCard key={id} amount={amount} text={text} percentage={percentage} currency={''} />)}


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
