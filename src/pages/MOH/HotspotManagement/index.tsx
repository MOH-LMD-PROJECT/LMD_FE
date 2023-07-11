import { useEffect, useState } from 'react';


import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Spin } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import { createHotspot, getHotspots } from '../../../api/apiRequests';
import { displayErrorMessage, displaySuccessMessage } from '../../../components/toast/Toast';
import HotspotDataTable from '../../../components/HotspotTable';



const HotspotDashboard = () => {
    const dispatch = useDispatch()
    const [hotspot_name, setHotspotName] = useState('')
    const [contact_person_name, setContactPersonName] = useState('')
    const [contact_person_telephone, setContactPersonPhone] = useState('')
    const [latitude, setLatitude] = useState()
    const [longtitude, setLongtitude] = useState()
    const [data, setData] = useState()
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    const [organization_unit_id, setOrgUnit] = useState(); // default is 'middle'
    const [modalOpen, setModalOpen] = useState(false);
    const [hotspotStatus, setHotspotStatus] = useState('')


    const hotspotQuery = useQuery({
        queryKey: ["hotspot"],
        queryFn: () => getHotspots(),
    })







    useEffect(() => {
        if (hotspotQuery.isSuccess) {
            setData(hotspotQuery.data)
        }
    }, [hotspotQuery.isSuccess, hotspotQuery.data]);



    const handleInputChange = (setState: (arg0: any) => void) => (event: { target: { value: any; }; }) => {
        setState(event.target.value)
        console.log(event.target.value)
    }




    const queryClient = useQueryClient()
    const createHotspotMutation = useMutation({
        mutationFn: createHotspot,
        onSuccess: (data: any) => {
            queryClient.setQueryData(["hotspot"], data)
            queryClient.invalidateQueries(["hotspot"], { exact: true })
            console.log(data)
            if (data.code == "401") {
                displayErrorMessage(`${data.message}`)
            }
            if (data.code == "201") {
                setModalOpen(false)
                displaySuccessMessage("Hotspot  created Successfully");
            }
        }
    })


    const createHotspotFn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createHotspotMutation.mutate({
            hotspot_name,
            contact_person_name,
            contact_person_telephone,
            latitude,
            longtitude,
            organization_unit_id,
            hotspot_status: hotspotStatus,

        })
    }

    //   const genderData = [
    //     { name: 'male' },
    //     { name: 'female' },
    //   ];
    //   console.log(unitData)

    return (
        <>
            <div>
                <div className='flex justify-between items-center bg-red-700 p-4 z-99999 '>
                    <div><h3 className='text-lg font-bold'>Hotspot Managment</h3></div>
                    <div style={{ background: '' }} className='flex justify-center items-center space-x-4'>
                        <div>
                            <Button
                                style={{ backgroundColor: '#1C2434', color: 'white', border: 'none' }}
                                onClick={() => setModalOpen(true)} type="primary" icon={< PlusOutlined rev={undefined} />} size={size}>
                                Add Hotspot
                            </Button>

                        </div>

                        <div>
                            <Button
                                style={{ backgroundColor: '#1C2434', color: 'white', border: 'none' }}
                                type="primary" icon={<DownloadOutlined rev={undefined} />} size={size}>
                                Export Excel
                            </Button>
                        </div>

                    </div>
                </div>

                <div className="col-span-12 xl:col-span-8 mt-10" >

                    {hotspotQuery.isLoading ? <Spin tip="Loading Table data" size="large">
                        <div className="content" />
                    </Spin> : <HotspotDataTable data={data} />}





                </div>

                <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                    {/* <ChartOne />
                    <ChartTwo />
                    <ChartThree />
                    <MapOne /> */}
                </div>
            </div>

            <Modal
                title="Create Hotspot"
                centered
                open={modalOpen}
                //@ts-ignore
                onOk={createHotspotFn}
                onCancel={() => setModalOpen(false)}
                width={1000}
                zIndex={10000000}
            >
                <form className='grid grid-cols-2 gap-2'>
                    <CustomInput onChange={handleInputChange(setHotspotName)} value='hotspot_name' placeholder='Enter Hotspot Name' label='Hotspot Name' type='text' name="hotspot_name" />
                    <CustomInput onChange={handleInputChange(setContactPersonName)} value='contact_person_name' placeholder='Enter contact person name' label='Contact Person Name' type='text' name="contact_person_name" />
                    <CustomInput onChange={handleInputChange(setContactPersonPhone)} value='contact_person_telephone' placeholder='Enter Contact Person Phone' label='Contact Person Phone' type='text' name="contact_person_telephone" />
                    <CustomInput onChange={handleInputChange(setLatitude)} value='latitude' placeholder='Enter latitude' label='Latitude' type='text' name="latitude" />
                    <CustomInput onChange={handleInputChange(setLongtitude)} value='longtitude' placeholder='Enter longtitude' label='longtitude' type='text' name="longtitude" />
                    <CustomInput onChange={handleInputChange(setOrgUnit)} value='organization_unit_id' placeholder='Enter orgID' label='OrganizationID' type='number' name="rganization_unit_id" />
                    <CustomInput onChange={handleInputChange(setHotspotStatus)} value='hotspot_status' placeholder='Enter Hotspot' label='Hotspot Status' type='text' name="hotspot_status" />






                    {/* <CustomSelect options={unitData} onChange={handleInputChange(setOrgUnit)} value='unit' label='Units of Measure' name="units" /> */}

                    {/* <CustomSelect options={genderData} onChange={handleInputChange(setType)} value='type' label='Type' name="type" /> */}

                </form>
            </Modal>

        </>
    );
};

export default HotspotDashboard;
