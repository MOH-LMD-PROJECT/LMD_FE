import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCondom, deleteCondomInventory } from '../../api/apiRequests';
import { displaySuccessMessage } from '../toast/Toast';



//@ts-ignore
const InventoryTable = ({ data }) => {
  // console.log(data)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredData, setFilteredData] = useState(data);
   console.log(filteredData)
   const dispatch = useDispatch()
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


const handleDeleteInventory = (id:any) => {
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
      render: (text:string, record:any) => (
        <Space size="middle">
          <Button type="primary" >
            Edit
          </Button>
         <Button danger  onClick={()=>handleDeleteInventory(record.id)}>
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

  return (
    <Table
      //@ts-ignore
       columns={columns}
      dataSource={Array.isArray(data) ? data : []} // Check if rawData is an array
      pagination={{ defaultPageSize: 10 }}
      //@ts-ignore

      onChange={handleTableChange}
    />
  );
};

export default InventoryTable;
