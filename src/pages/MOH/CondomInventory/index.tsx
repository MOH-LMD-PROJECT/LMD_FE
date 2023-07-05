import React, { useEffect, useState } from 'react';
import ChartOne from '../../../components/ChartOne';
import ChartThree from '../../../components/ChartThree';
import ChartTwo from '../../../components/ChartTwo';
import CustomCard from '../../../components/CustomCard';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { addCondoms, getCondomInventory, getCondoms, getUnits } from '../../../api/apiRequests';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Select } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
import { displayErrorMessage, displaySuccessMessage } from '../../../components/toast/Toast';
import CustomSelect from '../../../common/select';
import CondomItemDataTable from '../../../components/CondomItem';
import InventoryTable from '../../../components/InventoryTable';


const CondomInventory = () => {
  
    const [category, setCategory] = useState()
    const [brand, setBrand] = useState()
    const [type, setType] = useState()
    const [unit, setUnits] = useState()
    const [data,setData] = useState()
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    const [modalOpen, setModalOpen] = useState(false);
    const [unitData,setUnitData] = useState([])
    const [total,setTotal] = useState()


    const inventoryQuery = useQuery({
      queryKey: ["inventory"],
      queryFn: () => getCondomInventory(),
    })


    // const unitsQuery = useQuery({
    //     queryKey: ["unit"],
    //     queryFn: () => getUnits(),
    //   })

    //   useEffect(()=>{
    //     if (unitsQuery.isSuccess) {
    //         console.log(condomsQuery.data, "DATA IS HERE");
    //         setUnitData(unitsQuery.data)
    //       }
    //     }, [unitsQuery.isSuccess, unitsQuery.data]);
  
    useEffect(() => {
      if (inventoryQuery.isSuccess) {
        setData(inventoryQuery.data)
      }
    }, [inventoryQuery.isSuccess, inventoryQuery.data]);
    
  

    const handleInputChange = (setState: (arg0: any) => void) => (event: { target: { value: any; }; }) => {
        setState(event.target.value)
        console.log(event.target.value)
    }




  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: addCondoms,
    onSuccess: (data:any) => {
      queryClient.setQueryData(["condom"], data)
      queryClient.invalidateQueries(["condom"], { exact: true })
      console.log(data)
      if (data.code == "401") {
        displayErrorMessage(`${data.message}`)
      }
      if (data.code == "201") {
         setModalOpen(false)
        displaySuccessMessage("Condom created");
      }
    }
  })


    const createCondom  = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createPostMutation.mutate({
         category: category,
            brand: brand,
            unit_of_measure_id: unit,
            type: type
         
        })
      }

    const genderData = [
        { name: 'male' },
        {name: 'female' },
      ];
      console.log(unitData)


      const downloadExcel = () => {

        const workbook = XLSX.utils.book_new();
      
        // Create a new worksheet
        //@ts-ignore
        const worksheet = XLSX.utils.json_to_sheet(data);
      
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
        // Convert the workbook to an Excel file
        const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
        // Convert the Excel file to a Blob
        const blob = new Blob([excelFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
        // Save the Blob as a file
        saveAs(blob, 'data.xlsx');
      };
      

    return (
        <>
            <div>
                <div className='flex justify-between items-center bg-red-700 p-4 z-99999 '>
                    <div><h3 className='text-lg font-bold'>Condom Inventory</h3></div>
                    <div style={{ background: '' }} className='flex justify-center items-center space-x-4'>
                        <div>
                            <Button onClick={() => setModalOpen(true)} type="primary" icon={< PlusOutlined rev={undefined} />} size={size}>
                                Add Stock
                            </Button>

                        </div>

                        <div>
                        <Button type="primary" icon={<DownloadOutlined />} size={size} onClick={downloadExcel}>
                                Export PDF
                            </Button>
                        </div>

                    </div>
                </div>

                <div className="col-span-12 xl:col-span-8 mt-10" >

                    <InventoryTable data={data}/>  
                
                
                </div>

                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                    {/* <ChartOne />
                    <ChartTwo />
                    <ChartThree />
                    <MapOne /> */}
                </div>
            </div>

             <Modal
                title="Create User Modal"
                centered
                open={modalOpen}
                //@ts-ignore
                onOk={createCondom}
                onCancel={() => setModalOpen(false)}
                width={1000}
                zIndex={10000000}
            >
                <form className='grid grid-cols-2 gap-2'>
                    <CustomInput onChange={handleInputChange(setCategory)} value='category' placeholder='Enter Category' label='Category' type='text' name="firstname" />
                    <CustomInput onChange={handleInputChange(setBrand)} value='brand' placeholder='Enter brand' label='Brand' type='text' name="email" />
                    <CustomSelect options={unitData} onChange={handleInputChange(setUnits)} value='unit' label='Units of Measure' name="units" />
                  
                    <CustomSelect
                    //@ts-ignore
                    options={genderData} onChange={handleInputChange(setType)} value='type' label='Type'  name="type"/>

                </form>
            </Modal> 

        </>
    );
};

export default CondomInventory;
