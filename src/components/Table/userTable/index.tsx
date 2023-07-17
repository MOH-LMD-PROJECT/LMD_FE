import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Button } from 'antd';

const columns = [
    { name: 'id', header: 'Id', minWidth: 50, defaultFlex: 1 },
    { name: 'firstname', header: 'Fist Name', minWidth: 50, defaultFlex: 1 },
    { name: 'lastname', header: 'Last Name', maxWidth: 1000, defaultFlex: 1 },
    { name: 'location', header: 'Location', maxWidth: 1000, defaultFlex: 1 },
    { name: 'phone_number', header: 'Phone Number', maxWidth: 1000, defaultFlex: 2 },
    { name: 'username', header: 'User Name', maxWidth: 1000, defaultFlex: 1 },
    { name: 'email', header: 'Email', maxWidth: 1000, defaultFlex: 2 },
    { name: 'status', header: 'Status', maxWidth: 1000, defaultFlex: 1 },
    { name: 'organization_unit_id', header: 'Organization Id', maxWidth: 1000, defaultFlex: 1 },
    { name: 'role', header: 'Role', maxWidth: 1000, defaultFlex: 1 },
    { name: 'created_at', header: 'CreatedAt', maxWidth: 1000, defaultFlex: 2 },
    // {
    //     name: 'actions', header: 'Actions', maxWidth: 1000, defaultFlex: 3, render: () => {
    //         <div style={{ backgroundColor: "red", display: "flex" }}>
    //             bk
    //         </div>
    //     }
    // },


];



const gridStyle = { minHeight: 750 };



export default ({ dataSource }: any) => (

    <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={Array.isArray(dataSource) ? dataSource : []}
        style={gridStyle}
        sortable={true}
        pagination={true}
        editable={true}
        checkboxColumn
        enableColumnAutosize={true}
        expandedRows={true}
        collapsedGroups={true}
        rowReorderColumn={true}
    // renderRowDetailsExpandIcon={}

    // filterValue={}

    />
);