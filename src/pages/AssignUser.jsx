import React, { useState } from "react";
import {
  Select,
  Row,
  Col,
  Typography,
  Tag,
  Spin,
  Button,
  notification,
} from "antd";
import CustomTableTranfer from "../components/CustomTableTranfer";
import { useEffect } from "react";
import agent from "../libs/agent";

const { Option } = Select;
const { Title } = Typography;

const leftTableColumns = [
  {
    dataIndex: "code",
    title: "Code",
  },
  {
    dataIndex: "name",
    title: "Name",
  },
];

const rightTableColumns = [
  {
    dataIndex: "code",
    title: "Code",
  },
  {
    dataIndex: "name",
    title: "Name",
  },
];

const AssignUser = () => {
  const [loading, setLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [currentTutor, setCurrentTutor] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);

  const onChange = async (value) => {
    setCurrentTutor(value);
    setLoadingTable(true);
    const result = await agent.get("/tutor/" + value);
    if (result && result.data.success) {
      setAssignedStudents(result.data.results.map((el) => el.id.toString()));
    }
    setLoadingTable(false);
  };

  const _handlAssign = async () => {
    setAssignLoading(true)
    const result = await agent.post("/assign/", {
      tutor: currentTutor,
      student: assignedStudents,
    });
    if (result && result.data.success) {
      notification.success({
        message: "Assgin students sucessfully!",
      });
    }
    setAssignLoading(false)
  };

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const onChangeTranfer = (nextTargetKeys) => {
    
    console.log(nextTargetKeys);
    setAssignedStudents(nextTargetKeys);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingTable(true);
      const [resultTutor, resultStudent] = await Promise.all([
        agent.get("/handleRequest/users/tutor"),
        agent.get("/handleRequest/users/student"),
      ]);

      if (resultTutor && resultTutor.data.success) {
        setTutors(resultTutor.data.results);
      }

      if (resultStudent && resultStudent.data.success) {
        setStudents(resultStudent.data.results);
      }
      setLoading(false);
      setLoadingTable(false);
    };

    fetchData();
  }, []);

  const processData = (data) =>
    data.map((student) => {
      return {
        key: student.id.toString(),
        code: student.code,
        name: student.name,
        disabled: false,
      };
    });

  return (
    <div style={{ overflowX: "auto" }}>
      <Row type="flex" justify="center">
        <Col>
          <Title level={2}>Assign Tutor</Title>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 7 }}>
          <Select
            loading={loading}
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a tutor"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {tutors.map((el) => {
              return (
                <Option key={el.id} value={el.id}>
                  {el.name}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>
      <br />
      <br />
      <Row gutter={[0, 8]}>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 4 }}>
          <CustomTableTranfer
            loadingTable={loadingTable}
            titles={['Students', "Tutor's Students"]}
            style={{ width: "100%" }}
            dataSource={processData(students)}
            targetKeys={assignedStudents}
            showSearch={true}
            onChange={onChangeTranfer}
            filterOption={(inputValue, item) =>
              item.code.indexOf(inputValue) !== -1 ||
              item.name.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        </Col>

        <Col align="center" xs={{ span: 24, offset: 0 }}>
          <Button disabled={!currentTutor} loading={assignLoading} type="primary" onClick={_handlAssign}>
            Assign
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AssignUser;
