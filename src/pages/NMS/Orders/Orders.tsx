
import React, { useState } from 'react'
import CustomCard from '../../../components/CustomCard';
// import DfcpDataTable from '../../../components/dcfp/DfcpTable';
import OrderTable from '../../../components/NMS/OrderTable';
import CustomPicker from '../../../common/datepicker';
import { Divider } from 'antd';

const Orders = () => {
    const [visible, setVisible] =useState(false);
    const cardData = [
        {
            id: 1,
            title: 'Orders Recieved',
            amount: 10,

        },
        {
            id: 2,
            title: 'Orders Worked On',
            amount: 8,

        },
        {
            id: 3,
            title: 'Success rate',
            amount: "70%",

        },
    ];
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                {cardData.map(({ title, amount, id }) => (
                    <CustomCard
                        key={id}
                        title={title}
                        amount={amount}
                        percentage={0} />
                ))}
               
            </div>
           
               
                  <div>  <div className='flex justify-between items-center p-[2rem]'>
                  <div className='mt-[2rem] p-[1rem] text-left font-bold'><h1>Orders Table</h1></div>
                  <div>
                      <p>Select Range of display </p>
                      <CustomPicker />
                  </div>
              </div>
              <OrderTable />
              </div>
              
           
        </div>
    )
}

export default Orders



// import CardFour from '../../../components/CardFour.tsx';
// import CardOne from '../../../components/CardOne.tsx';
// import CardThree from '../../../components/CardThree.tsx';
// import CardTwo from '../../../components/CardTwo.tsx';
// import ChartOne from '../../../components/ChartOne.tsx';
// import ChartThree from '../../../components/ChartThree.tsx';
// import ChartTwo from '../../../components/ChartTwo.tsx';
// import ChatCard from '../../../components/ChatCard.tsx';
// import CustomCard from '../../../components/CustomCard.tsx';
// import MapOne from '../../../components/MapOne.tsx';

// const Admin = () => {
//   const cardData = [
//     {
//       id: 1,
//       currency: '$',
//       amount: 3213,
//       text: "Total hotspots",
//       percentage: 0.43
//     },
//     {
//       id: 2,
//       currency: '$',
//       amount: 3213,
//       text: "Total hotspots",
//       percentage: 0.43
//     },
//     {
//       id: 3,
//       currency: '$',
//       amount: 3213,
//       text: "Total hotspots",
//       percentage: 0.43
//     },
//     {
//       id: 4,
//       currency: '$',
//       amount: 3213,
//       text: "Total hotspots",
//       percentage: 0.43
//     },
//     {
//       id: 5,
//       currency: '$',
//       amount: 3213,
//       text: "Total hotspots",
//       percentage: 0.43
//     }
//   ]
//   return (
//     <>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

//         {cardData.map(({ currency, amount, text, percentage, id }) => <CustomCard key={id} currency={currency} amount={amount} text={text} percentage={percentage} />)}


//       </div>
//       <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
//         <ChartOne />
//         <ChartTwo />
//         <ChartThree />
//         <MapOne />
//       </div>
//     </>
//   );
// };

// export default Admin;
