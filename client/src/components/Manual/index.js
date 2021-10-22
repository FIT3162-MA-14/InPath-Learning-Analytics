import React from "react";
import "antd/dist/antd.css";
import { ManualCard, ManualContainer, ManualH1, ManualH2, ManualP } from "./ManualElem";
import { data } from "./ManualConstant";
import { Row, Divider } from "antd";

const Manual = () => {
  return (
    <>
      <ManualContainer>
        <ManualH1>Manual</ManualH1>

        {data.map((mappedData) => (
          <Row style={{ paddingTop: "20px" }}>
            {/* <Card hoverable="true" title={mappedData.title}>
              <Meta description={mappedData.text} />
            </Card> */}
            <ManualCard>
              <ManualH2>{mappedData.title}</ManualH2>
              <hr/>
              <ManualP>{mappedData.text}</ManualP>
            </ManualCard>
          </Row>
        ))}
        <Divider />
      </ManualContainer>
    </>
  );
};

export default Manual;
