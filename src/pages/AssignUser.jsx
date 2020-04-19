import React, { useState, useContext } from "react";
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
import { isObject } from 'lodash'
import { useHistory } from "react-router-dom";
import Store from "../context";

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
  const data = useContext(Store)
  const history = useHistory();
  if(!data.user || !["admin", "staff"].includes(data.user.role)) {
    history.push("/")
  }
  const [loading, setLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [currentTutor, setCurrentTutor] = useState(null);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [tutors, setTutors] = useState([]);

  const onChange = async (value) => {
    setCurrentTutor(value);
    setLoadingTable(true);

    const [resultTutor, resultUnassignedStudents] = await Promise.all([
      agent.get("/tutor/" + value),
      agent.get("/student-not-assign"),
    ]);

    if (resultTutor && resultTutor.data.success) {
      setAssignedStudents(resultTutor.data.results);
    }

    if (resultUnassignedStudents && resultUnassignedStudents.data.success) {
      setUnassignedStudents(resultUnassignedStudents.data.results);
    }

    setLoadingTable(false);
  };

  const _handlAssign = async () => {
    setAssignLoading(true);
    const result = await agent.post("/assign/", {
      tutor: currentTutor,
      student: assignedStudents.map(el => {
        if(isObject(el)) return el.id
        return el
      }),
    });
    if (result && result.data.success) {
      notification.success({
        message: "Assgin students sucessfully!",
      });
    }
    setAssignLoading(false);
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

  const onChangeTranfer = (nextTargetKeys, direction, moveKeys) => {
    if (direction === "left") {
      const targets = assignedStudents.filter((el) => {
        if (moveKeys.includes(el.id.toString())) return true;
        return false;
      });

      setUnassignedStudents([...unassignedStudents, ...targets]);
      setAssignedStudents(
        assignedStudents.filter((el) => !moveKeys.includes(el.id.toString()))
      );
    }

    if (direction === "right") {
      const targets = unassignedStudents.filter((el) => {
        if (moveKeys.includes(el.id.toString())) return true;
        return false;
      });

      setAssignedStudents([
        ...assignedStudents,
        ...targets
      ]);
      setUnassignedStudents(unassignedStudents.filter((el) => !moveKeys.includes(el.id.toString())));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingTable(true);
      const resultTutor = await agent.get("/handleRequest/users/tutor");

      if (resultTutor && resultTutor.data.success) {
        setTutors(resultTutor.data.results);
      }

      setLoading(false);
      setLoadingTable(false);
    };

    fetchData();
  }, []);

  const processData = (data) =>
    data.map((student) => {
      console.log(student);
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
      {currentTutor ? (
        <Row gutter={[0, 8]}>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 4 }}>
            <CustomTableTranfer
              loadingTable={loadingTable}
              titles={["Unssigned Students", "Tutor's Students"]}
              style={{ width: "100%" }}
              dataSource={processData([
                ...unassignedStudents,
                ...assignedStudents,
              ])}
              targetKeys={assignedStudents.map((el) => el.id.toString())}
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
            <Button
              disabled={!currentTutor}
              loading={assignLoading}
              type="primary"
              onClick={_handlAssign}
            >
              Assign
            </Button>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default AssignUser;
