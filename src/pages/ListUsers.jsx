import React, { useState, useRef, useEffect } from "react";
import { Typography, Table, Tag, Button, Input, Row, Col } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import agent from "../libs/agent";
import CONSTANTS from "../constants";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

const ListUsers = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const _handleChangeStatus = async (id) => {
    setLoading(true)
    const result = await agent.get("/change_status/" + id);

    if (result && result.data.success) {
      const newUsers = users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: result.data.results,
          };
        }
        return user
      });

      setUsers(newUsers);
    }

    setLoading(false)
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput && searchInput.current.select());
      }
    },
    render: (text) => {
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      );
    },
  });

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code, user) => {
        return <a onClick={() => history.push("/users/" + user.id)}>{code}</a>;
      },
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
      ...getColumnSearchProps("fullname"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (tag) => (
        <span>
          <Tag color={CONSTANTS.ROLE_COLOR[tag.toUpperCase()]} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            style={{ marginRight: 16 }}
            onClick={() => _handleChangeStatus(record.id)}
          >
            {record.status}
          </a>
          {/* <a>Delete</a> */}
        </span>
      ),
    },
  ];

  const _processUsers = (users) => {
    return users.map((user) => ({
      key: user.id,
      id: user.id,
      code: user.code,
      fullname: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      status: user.status,
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const result = await agent.get("/user");

      if (result && result.data.success) {
        setUsers(result.data.results);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  console.log(users, "users");

  return (
    <div style={{ overflowX: "auto" }}>
      <Row type="flex" justify="center">
        <Col>
          <Title level={2}>List Users</Title>
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={_processUsers(users)}
      />
    </div>
  );
};

export default ListUsers;
