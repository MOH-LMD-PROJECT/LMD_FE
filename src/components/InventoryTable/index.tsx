import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {  deleteCondomInventory } from '../../api/apiRequests';
import { displaySuccessMessage } from '../toast/Toast';
import CustomInput from '../../common/input';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { makeEdit } from '../../redux/slices/condom';


//@ts-ignore
const InventoryTable = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState()
  const [type, setType] = useState()
  const [unit, setUnits] = useState()
  const [orgId, setOrgId] = useState()
  const queryClient = useQueryClient()

  const getColumnSearchProps = (dataIndex: string, columnTitle: string) => ({
    //@ts-ignore
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${columnTitle}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string, record: { [x: string]: { toString: () => string; }; }) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        //@ts-ignore
        setTimeout(() => document.getElementById('searchInput').select(), 100);
      }
    },
    render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) =>
      searchedColumn === dataIndex ? (
        <span style={{ fontWeight: 'bold' }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys: React.SetStateAction<string>[], confirm: () => void, dataIndex: React.SetStateAction<string>) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  // const handleDeleteCondom = async (id:number)=>{
  //   //@ts-ignore
  //   dispatch(deleteCondom(id))
  //   //@ts-ignore
  //   dispatch(getCondoms())
  // }




  const deleteCondomMutation = useMutation({
    mutationFn: deleteCondomInventory,
    onSuccess: (data) => {
      queryClient.setQueryData(["inventory"], data)
      queryClient.invalidateQueries(["inventory"], { exact: true })
      displaySuccessMessage('inventory deleted')


    }
  })


  const handleDeleteInventory = (id: any) => {
    deleteCondomMutation.mutate(id)
  }


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: { id: number; }, b: { id: number; }) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity_in_stock',
      key: 'quantity_in_stock',
      ...getColumnSearchProps('quantity_in_stock', 'Quantity'),
    },
    {
      title: 'Batch Number',
      dataIndex: 'batch_number',
      key: 'batch_number',
      ...getColumnSearchProps('batch_number', 'Batch Number'),
    },
    {
      title: 'Unit of measure',
      dataIndex: 'unit_of_measure_id',
      key: 'unit_of_measure_id',
      ...getColumnSearchProps('unit_of_measure_id', 'Unit of measure'),
    },
    {
      title: 'Unit Cost',
      dataIndex: 'condom_unit_cost',
      key: 'condom_unit_cost',
      ...getColumnSearchProps('condom_unit_cost', 'Unit Cost'),
    },
    {
      title: 'Delivery Date',
      dataIndex: 'date_of_delivery',
      key: 'date_of_delivery',
      ...getColumnSearchProps('date_of_delivery', 'Delivery Date'),
    },
    {
      title: 'User',
      dataIndex: 'user_id',
      key: 'user_id',
      ...getColumnSearchProps('user_id', 'User'),
    },
    {
      title: 'Actions',
      key: 'id',
      render: (text: string, record: any) => (
        <Space size="middle">

      <Button 
              style={{ backgroundColor: '#1C2434', color: 'white', border: 'none' }}

      onClick={() => dispatch(makeEdit(record.id))} type="primary" >
          Manage
          </Button>
          <Button danger onClick={()=>handleDeleteInventory(record.id)} >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: { [x: string]: any; }, sorter: { field: any; order?: any; }) => {
    // Apply sorting
    if (sorter && sorter.field) {
      const { field, order } = sorter;
      const sortedData = [...filteredData].sort((a, b) => {
        const result =
          a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        return order === 'descend' ? -result : result;
      });
      setFilteredData(sortedData);
    }

    // Apply filtering
    if (filters && Object.keys(filters).length > 0) {
      let filteredDataCopy = [...data];
      Object.keys(filters).forEach((key) => {
        const selectedFilters = filters[key];
        if (selectedFilters.length > 0) {
          filteredDataCopy = filteredDataCopy.filter((item) =>
            selectedFilters.includes(item[key])
          );
        }
      });
      setFilteredData(filteredDataCopy);
    }
  };

  const handleInputChange = (setState: (arg0: any) => void) => (event: { target: { value: any; }; }) => {
    setState(event.target.value)
    console.log(event.target.value)
  }


  return (
    <>
      <Table
        //@ts-ignore
        columns={columns}
        dataSource={Array.isArray(data) ? data : []} // Check if rawData is an array
        pagination={{ defaultPageSize: 10 }}
        //@ts-ignore

        onChange={handleTableChange}
      />
      <Modal
        title="Create Condom Inventory"
        centered
        open={modalOpen}
        //@ts-ignore
        // onOk={createInventory}
        onCancel={() => setModalOpen(false)}
        width={1000}
        zIndex={10}
      >
        <form className='grid grid-cols-2 gap-2'>
          <CustomInput onChange={handleInputChange(setQuantity)} value='quantity' placeholder='Enter quantity' label='Quantity' type='number' name="quantity" />
          {/* <CustomInput onChange={handleInputChange(setBatch)} value='batch' placeholder='Enter batch number' label='Batch Number' type='text' name="batch" />
                    <CustomSelect options={unitData} onChange={handleInputChange(setUnits)} value='unit' label='Units of Measure' name="units" />
                    <CustomSelect options={condomData} onChange={handleInputChange(setCondom)} value='condom' label='Condom' name="condom" /> 
                    <CustomInput onChange={handleInputChange(setUnitCost)} value='unitCost' placeholder='Enter unit cost' label='Unit Cost' type='number' name="unit_cost" />
                    <CustomInput onChange={handleInputChange(setDate)} value='date' placeholder='Enter Delivery date' label='Delivery date' type='date' name="date" />
                    <CustomInput onChange={handleInputChange(setOrgId)} value='orgId' placeholder='Enter organisation id' label='Organisation Id' type='number' name="orgId" /> */}
        </form>
      </Modal>
    </>
  );
};

export default InventoryTable;
