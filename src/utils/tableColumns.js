export const teamManagement_columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      // width: '25%',
      editable: false,
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      // width: '25%',
      editable: true,
    },
    {
      title: '司职',
      dataIndex: 'take_charge',
      // width: '25%',
      editable: true,
    },
    {
      title: '邮箱',
      dataIndex: 'em',
      editable: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      editable: true,
    },
    {
      title: '球衣号码',
      dataIndex: 'jersey_number',
      // width: '15%',
      editable: true,
    },
    {
      title: '球衣码数',
      dataIndex: 'jersey_size',
      // width: '15%',
      editable: true,
    },
    {
      title: '身高',
      dataIndex: 'height',
      // width: '15%',
      editable: true,
    },
    {
      title: '体重',
      dataIndex: 'weight',
      // width: '15%',
      editable: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      // width: '40%',
      editable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      // width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const isEditing = (record) => record.key === editingKey;
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
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
      },
    },
  ];