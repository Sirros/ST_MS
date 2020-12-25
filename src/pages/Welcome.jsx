import React from 'react';
import { Card } from 'antd';
import { FormattedMessage } from 'umi';
import {
  Row, Col, Carousel, Statistic,
} from 'antd';
import {
  LikeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import TeamLogo from '../assets/logo.png';
import styles from './Welcome.less';

const { Meta } = Card;

export default () => {
  return (
    <div className={styles.homeTopWrapper}>
      <div className={styles.homeTopLeft}>
        <Card>
          <img src={TeamLogo} alt="logo" />
          <Meta title="title" description="xxxxxxx" style={{ marginTop: 15 }} />
        </Card>
        <Row>
          <Col span={24}>
            <Card title="组织信息" hoverable={true}>
              xxxxxxxxxxxxxxxxx
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card hoverable={true}>
              <Statistic title='团队经费' value={1128} prefix={<LikeOutlined />} />
            </Card>
          </Col>
        </Row>
      </div>
      <div className={styles.homeTopMid}>
        <Row justify="center" gutter={10}>
          <Col span={12}>
            <Card hoverable={true}>
              运动员
              <br />
              #10
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable={true}>
              管理员
              <br />
              #10
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable={true}>
              即将到来的比赛
              <br />
              #10
            </Card>
          </Col>
          <Col span={12}>
            <Card hoverable={true}>
              照片
              <br />
              #10
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card hoverable={true}>
              公告
              <Meta description="asofhaghasgasasfasfasfasfasfasfasfasfasfasfas" />
            </Card>
          </Col>
        </Row>
      </div>
      <div className={styles.homeTopRight}>
        <Carousel style={{marginBottom: 10}} autoplay dotPosition="bottom">
          <div className={styles.carouselItem}>
            <img
              src="https://images.pexels.com/photos/5168816/pexels-photo-5168816.jpeg?cs=srgb&dl=pexels-alex-kozlov-5168816.jpg&fm=jpg"
              alt=""
            />
          </div>
          <div className={styles.carouselItem}>
            <img
              src="https://images.pexels.com/photos/1842580/pexels-photo-1842580.jpeg?cs=srgb&dl=pexels-matt-hardy-1842580.jpg&fm=jpg"
              alt=""
            />
          </div>
        </Carousel>
        <Row gutter={10}>
          <Col span={12}>
            <Card>
              <Statistic
                title="今日气温"
                value={21.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="明日气温"
                value={23.4}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
