import React from "react";
import "antd/dist/antd.css";
import { RankCard, RankContainer, RankH1, RankH2, RankP } from "./BadgeElem";
import { Row, Col, Table, Divider } from "antd";
import { users } from "./RankConstant";

const columns = [
    {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Badge",
        dataIndex: "badge",
        key: "badge",
    },
];

const Badge = () => {
    return (
        <>
            <RankContainer>
                <RankH1>Ranking</RankH1>
                <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                    {users
                        .filter((user) => user.rank <= 3)
                        .map((filteredUser) => (
                            <Col span={8}>
                                <RankCard>
                                    <RankH2>{`Rank ${filteredUser.rank}`}</RankH2>
                                    <hr />
                                    <RankH2>{filteredUser.name}</RankH2>
                                    <RankP>{filteredUser.badge}</RankP>
                                </RankCard>
                            </Col>
                        ))}
                </Row>

                <Divider />

                <Table
                    dataSource={users.filter((user) => user.rank > 3)}
                    columns={columns}
                    pagination={false}
                />
                <Divider />
            </RankContainer>
        </>
    );
};

export default Badge;
