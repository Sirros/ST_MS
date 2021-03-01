import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Button, Input, InputNumber, Popconfirm, Form, Typography, Tooltip } from 'antd';
// import { teamManagement_columns } from '@/utils/tableColumns';

export default () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const data = {
      key: 123,
      name: `林子博`,
      attr: '队员',
      age: 32,
      address: `中国香港`,
      studentId: '2017141463192',
      take_charge: 'SF/PF',
      em: '121970263@qq.com',
      phone: '13032867907',
      jersey_number: '1',
      jersey_size: 'xxxl',
      height: '182cm',
      weight: '80kg',
      remark: '暂无伤病信息暂无伤病信息暂无伤病信息暂无伤病信息',
    };
    setTableData([...tableData, data]);
  }, []);

  // 可编辑控件
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  // 取消编辑状态
  const cancel = () => {
    setEditingKey('');
  };

  // 编辑状态下保存
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log(row);
      const newData = [...tableData];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setTableData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setTableData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: '100px',
      editable: false,
      fixed: 'left',
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      width: '180px',
      editable: true,
    },
    {
      title: '属性',
      dataIndex: 'attr',
      width: '100px',
      editable: true,
    },
    {
      title: '司职',
      dataIndex: 'take_charge',
      width: '100px',
      editable: true,
    },
    {
      title: '邮箱',
      dataIndex: 'em',
      width: '220px',
      editable: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: '170px',
      editable: true,
    },
    {
      title: '球衣号码',
      dataIndex: 'jersey_number',
      width: '110px',
      editable: true,
    },
    {
      title: '球衣码数',
      dataIndex: 'jersey_size',
      width: '100px',
      editable: true,
    },
    {
      title: '身高',
      dataIndex: 'height',
      width: '110px',
      editable: true,
    },
    {
      title: '体重',
      dataIndex: 'weight',
      width: '110px',
      editable: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: '140px',
      editable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: '200px',
      editable: true,
      ellipsis: {
        showTitle: false,
      },
      render: (remark) => (
        <Tooltip placement="topLeft" title={remark}>
          {remark}
        </Tooltip>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '80px',
      fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="#!"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="确认取消吗？" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // 添加成员
  const handleAddPerson = () => {
    const newData = {
      key: `*&-${count}`,
      name: `名字`,
      attr: '队员',
      age: 0,
      address: `四川成都`,
      studentId: '',
      take_charge: 'SF/PF',
      em: '',
      phone: '',
      jersey_number: '',
      jersey_size: 'l',
      height: '',
      weight: '',
      remark: '暂无伤病信息暂无伤病信息暂无伤病信息暂无伤病信息',
    };
    setCount(count + 1);
    setTableData([newData, ...tableData]);
  };

  return (
    <PageContainer>
      <Form form={form} component={false}>
        <Button
          onClick={handleAddPerson}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          添加成员
        </Button>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={tableData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          scroll={{ x: 1300 }}
        />
      </Form>
    </PageContainer>
  );
};
