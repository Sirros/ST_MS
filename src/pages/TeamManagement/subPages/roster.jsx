import React, { useEffect, useState } from 'react';
// import ReactExport from 'react-export-excel';
import { AudioOutlined } from '@ant-design/icons';
import {
  Table,
  Button,
  Input,
  message,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Tooltip,
  Space,
  Card,
} from 'antd';
import _ from 'lodash';
import { getDifference } from '@/utils/utils.js';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './styles/roster.less';

export default () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  // 导出文件相关
  // const ExcelFile = ReactExport.ExcelFile;
  // const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  // const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  // 搜索框相关
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  useEffect(() => {
    const data = {
      key: 123,
      name: `林子博`,
      attr: '队员',
      grade: '2017',
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
                message: `${title} 不能为空!`,
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

  // 取消编辑状态
  const cancel = () => {
    setEditingKey('');
  };

  // 编辑状态下保存，key：编辑行的 key
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log(row);
      // 更新一行数据，后台根据唯一学号更改
      const newData = [...tableData];
      // 修改
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        if (!Object.keys(getDifference(row, newData[index])).length) {
          message.info('数据没有修改');
        } else {
          newData.splice(index, 1, { ...newData[index], ...row });
          setTableData(newData);
          // 这里发请求
          //
          //
          message.success('修改成功');
        }
      } else {
        // 新增请求
        //
        //
        newData.push(row);
        setTableData(newData);
      }
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      errInfo.errorFields.forEach((i) => {
        message.warn(`${i.errors}`);
      });
    }
  };

  const handleDelete = (deleteId) => {
    console.log('删除队员', deleteId);
  };

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
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
      sorter: (a, b) => a.studentId - b.studentId,
    },
    {
      title: '年级',
      dataIndex: 'grade',
      width: '160px',
      editable: true,
      sorter: (a, b) => a.grade - b.grade,
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
      title: '身高/cm',
      dataIndex: 'height',
      width: '110px',
      editable: true,
      sorter: (a, b) => a.height - b.height,
    },
    {
      title: '体重/kg',
      dataIndex: 'weight',
      width: '110px',
      editable: true,
      sorter: (a, b) => a.weight - b.weight,
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
      width: '160px',
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
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              编辑
            </Typography.Link>

            <Popconfirm
              title="确认删除吗？请慎重！"
              onConfirm={() => handleDelete(record.studentId)}
            >
              <Button style={{ marginLeft: 20 }} type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </>
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

  // 搜索
  const handleOnSearch = (value) => {
    console.log(value);
  };

  // 导出数据表
  const handleExportTable = () => {
    console.log('导出');
  };

  function renderButtons() {
    return (
      <>
        <Button onClick={handleAddPerson} type="primary">
          添加成员
        </Button>
        <Search
          style={{ width: '20%', marginLeft: 16 }}
          placeholder="请输入姓名或学号"
          onSearch={handleOnSearch}
          enterButton
        />
        <ExcelFile filename="队员信息表" element={<Button type="dashed">导出数据表</Button>}>
          <ExcelSheet data={tableData} name="队员信息表">
            {/* <ExcelColumn
                label="Marital Status"
                value={(col) => (col.is_married ? 'Married' : 'Single')}
              /> */}
            <ExcelColumn label="姓名" value="name" />
            <ExcelColumn label="学号" value="studentId" />
            <ExcelColumn label="年级" value="grade" />
            <ExcelColumn label="属性" value="attr" />
            <ExcelColumn label="司职" value="take_charge" />
            <ExcelColumn label="年龄" value="age" />
            <ExcelColumn label="地址" value="address" />
            <ExcelColumn label="邮箱" value="em" />
            <ExcelColumn label="电话" value="phone" />
            <ExcelColumn label="球衣号码" value="jersey_number" />
            <ExcelColumn label="球衣尺寸" value="jersey_size" />
            <ExcelColumn label="身高" value="height" />
            <ExcelColumn label="体重" value="weight" />
            <ExcelColumn label="备注" value="remark" />
          </ExcelSheet>
        </ExcelFile>
      </>
    );
  }

  function renderTable() {
    return (
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
    );
  }

  return (
    <PageContainer>
      <div className={styles.formWrapper}>
        <Form form={form} component={false}>
          {renderButtons()}
          {renderTable()}
        </Form>
      </div>
    </PageContainer>
  );
};
