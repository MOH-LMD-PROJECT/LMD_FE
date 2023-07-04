import React, { useEffect, useState } from 'react';
import ChartOne from '../../../components/ChartOne';




import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Radio, Space, Divider, Modal, Select } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import CustomInput from '../../../common/input';
import Table from '../../../components/Table/index';
import { displayErrorMessage, displaySuccessMessage } from '../../../components/toast/Toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, getUsers, loginUser } from '../../../api/apiRequests';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
    const [modalOpen, setModalOpen] = useState(false);


    const navigate = useNavigate()
    const cardData = [
        {
            id: 1,

            amount: 3213,
            text: "Active users",
            percentage: 0.43
        },
        {
            id: 2,

            amount: 3213,
            text: "Total Users",
            percentage: 0.43
        },
        {
            id: 3,

            amount: 3213,
            text: "InActive Users",
            percentage: 0.43
        },
        {
            id: 4,

            amount: 3213,
            text: "Total hotspots",
            percentage: 0.43
        },

    ]
    //create user mutation 
    // const createUserMutation = useMutation(createUser);

    const [username, setUserName] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [organization_unit_id, setOrgUnit] = useState('')
    const [location, setLocation] = useState('')
    const [phone_number, setPhone] = useState('')
    // const [username, setUserName] = useState<string>()
    const [users,setUsers] = useState()

    const handleInputChange = (setState: (arg0: any) => void) => (event: { target: { value: any; }; }) => {
        setState(event.target.value)
        console.log(event.target.value)
    }

    const queryClient = useQueryClient()

    const usersQuery = useQuery({
        queryKey: ["user"],
        queryFn: () => getUsers(),
      })
    
      useEffect(() => {
        if (usersQuery.isSuccess) {
          setUsers(usersQuery.data)
        }
      }, [usersQuery.isSuccess, usersQuery.data]);
      


    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data)
            queryClient.invalidateQueries(["user"], { exact: true })
            console.log(data)

            if(data.code=="201"){
                displaySuccessMessage('User created ')
                setModalOpen(false)
            }

        }
    })

    const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        createUserMutation.mutate({
            username,
            firstname,
            lastname,
            password,
            email,
            role,
            organization_unit_id,
            location,
            phone_number,
        })
    }


    return (
        <>
            <div>
                <div className='flex justify-between items-center bg-red-700 p-4 z-99999 '>
                    <div><h3 className='text-lg font-bold'>User Managment</h3></div>
                    <div style={{ background: '' }} className='flex justify-center items-center space-x-4'>
                        <div>
                            <Button onClick={() => setModalOpen(true)} type="primary" icon={< PlusOutlined rev={undefined} />} size={size}>
                                Create User
                            </Button>

                        </div>

                        <div>
                            <Button type="primary" icon={<DownloadOutlined rev={undefined} />} size={size}>
                                Export PDF
                            </Button>
                        </div>

                    </div>
                </div>

                <div className="col-span-12 xl:col-span-8 mt-10" >
                <Table data={users} /> 
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
                onOk={handleCreateUser}
                onCancel={() => setModalOpen(false)}
                width={1000}
                zIndex={10000000}
            >
                <form className='grid grid-cols-2 gap-2'>
                    <CustomInput onChange={handleInputChange(setFirstName)} value='firstname' placeholder='Enter firstname' label='firstname' type='text' name="firstname" />
                    <CustomInput onChange={handleInputChange(setLastName)} value='lastname' placeholder='Enter lastname' label='lastname' type='text' name="lastname" />
                    <CustomInput onChange={handleInputChange(setEmail)} value='email' placeholder='Enter email' label='email' type='text' name="email" />
                    <CustomInput onChange={handleInputChange(setLocation)} value='location' placeholder='Enter location' label='location' type='text' name="location" />
                    <CustomInput onChange={handleInputChange(setUserName)} value='username' placeholder='Enter username' label='username' type='text' name="username" />

                    <CustomInput onChange={handleInputChange(setPassword)} value='password' placeholder='Enter password' label='password' type='text' name="password" />
                    <CustomInput onChange={handleInputChange(setPhone)} value='phone_number' placeholder='Enter number' label='phone number' type='text' name="phone" />
                    <CustomInput onChange={handleInputChange(setRole)} value='role' placeholder='Enter role ' label='role' type='text' name="role" />
                    <CustomInput onChange={handleInputChange(setOrgUnit)} value='organization_unit_id ' placeholder='Enter org id  ' label='org' type='text' name="organization_unit_id" />

                    {/* <Select
                        onChange={() => handleInputChange(setRole)} value='role'
                        // defaultValue="admin"
                        style={{ width: 460, padding: 8 }}
                        // onChange={handleChange}
                        options={[
                            {
                                label: 'select role',
                                options: [
                                    { label: 'vht', value: 'vht' },
                                    { label: 'doctor', value: 'doctor' },
                                ],
                            },

                        ]}
                    />

                    <Select
                        style={{ width: 460, padding: 8 }}
                        // onChange={handleChange}
                        options={[
                            {
                                label: 'select organization unit',
                                options: [
                                    { label: '1', value: '1' },
                                    { label: '2', value: '2' },
                                ],
                            },

                        ]}
                    /> */}


                </form>
            </Modal>

        </>
    );
};

export default AdminDashboard;
