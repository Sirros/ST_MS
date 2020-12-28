import React, { Component, forwardRef } from 'react';
import { Card } from 'antd';
import { FormattedMessage } from 'umi';
import {
  Row, Col, Carousel, Statistic,
  Divider, List
} from 'antd';
import {
  LikeOutlined,
  ArrowUpOutlined,
  AlertOutlined,
} from '@ant-design/icons';
import TeamLogo from '../assets/logo.png';
import styles from './Welcome.less';

const { Meta } = Card;

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
export default class extends Component {
  render () {
    return (
      <div className={styles.homeTopWrapper}>
        <div className={styles.homeTopLeft}>
          <Card>
            <img src={TeamLogo} alt="logo" />
            <Meta title="title" description="xxxxxxx" style={{ marginTop: 15 }} />
          </Card>
          {/* <Row>
            <Col span={24}>
              <Card style={{color: '#c4c4c4'}} hoverable={true}>
                所属：四川大学软件学院  
              </Card>
            </Col>
          </Row> */}
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
                <AlertOutlined />公告
                <List
                  className={styles.listText}
                  size="small"
                  bordered
                  dataSource={data}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
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
          <Divider dashed className={styles.myText}>想对自己说</Divider>
          <div>
            <List
              onMouseOver={() => {console.log('over')}}
              className={styles.listText}
              size="small"
              bordered
              dataSource={data}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </div>
        </div>
      </div>
    );
  }
};
