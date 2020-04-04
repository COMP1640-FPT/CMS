import React, { useState } from "react";
import { Select, Row, Col, Typography, Tag } from "antd";
import CustomTableTranfer from "../components/CustomTableTranfer";

const { Option } = Select;
const { Title } = Typography;

const mockTags = ["cat", "dog", "bird"];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
    tag: mockTags[i % 3]
  });
}

const originTargetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);

const leftTableColumns = [
  {
    dataIndex: "title",
    title: "Name"
  },
  {
    dataIndex: "tag",
    title: "Tag",
    render: tag => <Tag>{tag}</Tag>
  },
  {
    dataIndex: "description",
    title: "Description"
  }
];
const rightTableColumns = [
  {
    dataIndex: "title",
    title: "Name"
  }
];

const AssignUser = () => {
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const onChangeTranfer = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <Row type="flex" justify="center">
        <Col>
          <Title level={2}>Assign Tutor</Title>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 10, offset: 7 }}>
          <Select
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
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 4 }}>
          <CustomTableTranfer
            style={{ width: "100%" }}
            dataSource={mockData}
            targetKeys={targetKeys}
            showSearch={true}
            onChange={onChangeTranfer}
            filterOption={(inputValue, item) =>
              item.title.indexOf(inputValue) !== -1 ||
              item.tag.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AssignUser;
