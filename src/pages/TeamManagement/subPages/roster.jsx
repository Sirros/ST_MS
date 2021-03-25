import React, { useEffect, useState, useRef } from 'react';
import ReactExport from 'react-export-excel';
import { AudioOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
  Modal,
} from 'antd';
import _ from 'lodash';
import { connect } from 'umi';
import { getDifference } from '@/utils/utils.js';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './styles/roster.less';

const sub_Roster = ({ list, dispatch }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [tableData, setTableData] = useState([]);
  const [tableBasicData, setTableBasicData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // 导出文件相关
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const formRef = useRef();

  const { confirm } = Modal;

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

  // 表单校验提示信息
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  useEffect(() => {
    dispatch({
      type: 'subRoster/getTotalPerson',
    });
  }, []);

  useEffect(() => {
    console.log(list);
    const { members, retList } = list;
    setTableBasicData([...members]);
    if (retList.length > 0) {
      setTableData([...retList]);
    } else {
      setTableData([...members]);
    }
  }, [list]);

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
      // 更新一行数据，后台根据唯一学号更改
      const newData = [...tableData];
      // 修改
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        if (!Object.keys(getDifference(row, newData[index])).length) {
          message.info('数据没有修改');
        } else {
          console.log(getDifference(row, newData[index]));
          // 这里发请求
          dispatch({
            type: 'subRoster/updateUser',
            payload: {
              uid: row.studentId,
              changeKey: Object.keys(getDifference(row, newData[index])),
              changeRow: row,
            },
          });
          newData.splice(index, 1, { ...newData[index], ...row });
          setTableData(newData);
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
            <Button
              onClick={() => showDeleteConfirm(record.studentId)}
              style={{ marginLeft: 20 }}
              type="primary"
              danger
            >
              删除
            </Button>
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

  const showDeleteConfirm = (deleteId) => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除此队员吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        console.log('删除队员', deleteId);
        dispatch({
          type: 'subRoster/deleteUser',
          payload: deleteId,
        });
        message.success('删除成员成功！');
      },
      onCancel() {
        console.log('取消');
      },
    });
  };

  // 搜索
  const handleOnSearch = (value) => {
    dispatch({
      type: 'subRoster/searchPlayer',
      payload: value,
    });
  };

  const handleResetTable = () => {
    setTableData(tableBasicData);
  };

  const handleOk = () => {
    const newMemberInfo = formRef.current.getFieldsValue().player;
    console.log(newMemberInfo);
    dispatch({
      type: 'subRoster/addMember',
      payload: newMemberInfo,
    });
    newMemberInfo.key = newMemberInfo.studentId;
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setTableData([...tableData, newMemberInfo]);
      setConfirmLoading(false);
      message.success('添加完成，如有信息未填写，请尽量完善😊～');
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  function renderButtons() {
    return (
      <>
        <Button onClick={() => setVisible(true)} type="primary">
          添加成员
        </Button>
        <Search
          style={{ width: '20%', marginLeft: 16 }}
          placeholder="请输入姓名或学号"
          onSearch={handleOnSearch}
          enterButton
        />

        <Button onClick={handleResetTable} style={{ marginLeft: 10 }} type="primary">
          重置
        </Button>
        <ExcelFile
          filename="队员信息表"
          element={
            <Button style={{ marginLeft: 50 }} type="dashed">
              导出excel表格
            </Button>
          }
        >
          <ExcelSheet data={tableBasicData} name="队员信息表">
            <ExcelColumn label="姓名" value="name" />
            <ExcelColumn label="年级" value="grade" />
            <ExcelColumn label="学号" value="studentId" />
            <ExcelColumn label="司职" value="take_charge" />
            <ExcelColumn label="球衣码数" value="jersey_size" />
            <ExcelColumn label="身高" value="height" />
            <ExcelColumn label="体重" value="weight" />
            <ExcelColumn label="电话" value="phone" />
            <ExcelColumn label="邮箱" value="em" />
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

  function renderForm() {
    return (
      <Form
        ref={formRef}
        name="add-new-people"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['player', 'name']}
          label="姓名"
          rules={[
            {
              required: true,
              type: 'string',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['player', 'studentId']}
          label="学号"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['player', 'grade']}
          label="年级"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['player', 'attr']}
          label="属性"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="「队长、队员、经理」" />
        </Form.Item>
        <Form.Item
          name={['player', 'phone']}
          label="电话"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name={['player', 'take_charge']}
          label="司职"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="「PG｜SG｜SF｜PF｜C」可混合，以‘/’分割" />
        </Form.Item>
        <Form.Item
          name={['player', 'em']}
          label="邮箱"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name={['player', 'jersey_number']}
          label="球衣号码"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name={['player', 'jersey_size']}
          label="球衣码数"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="「s m l xl xxl xxxl xxxxl」" />
        </Form.Item>
        <Form.Item
          name={['player', 'height']}
          label="身高"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="单位cm" />
        </Form.Item>
        <Form.Item
          name={['player', 'weight']}
          label="体重"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="单位kg" />
        </Form.Item>
        <Form.Item
          name={['player', 'address']}
          label="地址"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item name={['player', 'remark']} label="备注">
          <Input.TextArea />
        </Form.Item>
      </Form>
    );
  }

  return (
    <PageContainer>
      <div className={styles.formWrapper}>
        <Modal
          title="添加成员"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          {renderForm()}
        </Modal>
        <Form form={form} component={false}>
          {renderButtons()}
          {renderTable()}
        </Form>
      </div>
    </PageContainer>
  );
};

export default connect(({ subRoster }) => ({
  list: subRoster,
}))(sub_Roster);
