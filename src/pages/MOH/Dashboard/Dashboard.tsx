import CustomCard from '../../../components/CustomCard';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../../api/apiRequests';
const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [activeUsers, setActiveUsers] = useState(0)
  const [total,setTotal] = useState()


  const usersQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsers(),
  })

  useEffect(() => {
    if (usersQuery.isSuccess) {
      setUsers(usersQuery.data)
      const active = usersQuery.data.filter((user:any) => user.status === 'active');
      setActiveUsers(active)
    }
  }, [usersQuery.isSuccess, usersQuery.data]);
  



  const cardData = [
    {
      id: 1,
      amount: users.length,
      text: "Total Users",
      // percentage: 0.43
    },
    {
      id: 2,
      amount: activeUsers.length,
      text: "Active Users",
      // percentage: 0.43
    },
    {
      id: 3,
      amount: users.length - activeUsers.length,
      text: "In active",
      // percentage: 0.43
    }
  ]



  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

        {cardData.map(({ amount, text, percentage, id }) => <CustomCard key={id} amount={amount} text={text} percentage={percentage} currency={''} />)}


      </div>
     
    </>
  );
};

export default Dashboard;
