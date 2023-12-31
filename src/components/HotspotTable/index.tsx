import React, { useState } from 'react';
//@ts-ignore
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCondom, deleteHotspot } from '../../api/apiRequests';
import { displaySuccessMessage } from '../toast/Toast';
import { makeEdit } from '../../redux/slices/condom';
//@ts-ignore
const HotspotDataTable = ({ data }) => {
    // console.log(data)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [open, setOpen] = useState(false)
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






    const deleteHostspotMutation = useMutation({
        mutationFn: deleteHotspot,
        onSuccess: (data) => {
            queryClient.setQueryData(["hotspot"], data)
            queryClient.invalidateQueries(["hotspot"], { exact: true })
            if (data.code == "201") {
                displaySuccessMessage('Hostspot deleted')
            }

        }
    })


    const handleDeleteCondom = (id: any) => {
        deleteHostspotMutation.mutate(id)
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
            title: 'Hotspot Name',
            dataIndex: 'hotspot_name',
            key: 'hotspot_name',
            ...getColumnSearchProps('hotspot_name', 'Hotspot Name'),
        },
        {
            title: 'Contact Person',
            dataIndex: 'contact_person_name',
            key: 'contact_person_name',
            ...getColumnSearchProps('contact_person_name', 'Contact Person'),
        },
        {
            title: 'Contact Person Telephone',
            dataIndex: 'contact_person_telephone',
            key: 'contact_person_telephone',
            ...getColumnSearchProps('contact_person_telephone', 'Contact Person Telephone'),
        },
        {
            title: 'Hotspot Status',
            dataIndex: 'hotspot_status',
            key: 'hotspot_status',
            ...getColumnSearchProps('hotspot_status', 'Hotspot Status'),
        },
        {
            title: 'Actions',
            key: 'id',
            render: (text: string, record: any) => (
                <Space size="middle">
                    <Button
                        style={{ backgroundColor: '#1C2434', color: 'white', border: 'none' }}
                        onClick={() => dispatch(makeEdit(record.id))} type="primary" >
                        Edit
                    </Button>
                    <Button danger  >
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

export default HotspotDataTable;
