import React from 'react'
import CustomCard from '../../components/CustomCard';
import DfcpDataTable from '../../components/dcfp/DfcpTable';
import CustomPicker from '../../common/datepicker';
import { Button } from 'antd';
import { DownloadOutlined} from '@ant-design/icons';

const MyOrdersH = () => {
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
            amount: 12,

        },
    ];
    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
                {cardData.map(({ title, amount, id }) => (
                    <CustomCard
                        key={id}
                        title={title}
                        amount={amount}
                        percentage={0} />
                ))}
            </div>
            <div className='flex justify-between items-center p-[2rem]'>
                <div className='mt-[2rem] p-[1rem] text-left font-bold'><h1>Orders Table</h1></div>
                <div className='h-full  w-[50vw] flex items-center justify-between'>
                    <p>Select Range of display </p>
                    <CustomPicker />
                    <Button
                                style={{ backgroundColor: '#1C2434', color: 'white', border: 'none' }}
                                type="primary" icon={<DownloadOutlined rev={undefined} size={50} />}>
                                Order
                            </Button>
                </div>
            </div>
            <DfcpDataTable />
        </div>
    )
}

export default MyOrdersH