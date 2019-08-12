import React from 'react';
import {
    Table
} from 'antd';

export default ({ columns, data }) => {
    return (
        <Table columns={columns} dataSource={data} />
    )
}