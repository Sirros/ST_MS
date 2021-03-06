import React, { useRef, useState, useEffect } from 'react';
import { Row, Col, Carousel, Statistic, Divider, List, Badge, Card } from 'antd';
import { LikeOutlined, ArrowUpOutlined, NotificationOutlined } from '@ant-design/icons';
// import { history } from 'umi';
import TeamLogo from '../assets/logo.png';
import styles from './Welcome.less';

const { Meta } = Card;

const data = [
  '1Racing car sprays burning fuel into crowd.',
  '2Japanese princecommoner.',
  '3Australian walks 100km after outback crash.',
  '4Man charged over missing wedding girl.',
  '5Los Angeles battles huge wildfires.',
  '6Japanprincess to wed commoner.',
  '7Ausks 100km after outback crash.',
  '8Man cver missing wedding girl.',
  '9Los Anges huge wildfires.',
];

export default () => {
  const [list, setList] = useState(data);
  const [isScrolle, setIsScrolle] = useState(true);

  // 滚动速度，值越小，滚动越快
  const speed = 30;
  const warper = useRef();
  const childDom1 = useRef();
  const childDom2 = useRef();

  useEffect(() => {
    console.log(localStorage.getItem('antd-pro-authority'));
  }, []);

  // 开始滚动
  useEffect(() => {
    // 多拷贝一层，让它无缝滚动
    childDom2.current.innerHTML = childDom1.current.innerHTML;
    let timer;
    if (isScrolle) {
      timer = setInterval(
        () =>
          warper.current.scrollTop >= childDom1.current.scrollHeight
            ? (warper.current.scrollTop = 0)
            : warper.current.scrollTop++,
        speed,
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isScrolle]);

  const hoverHandler = (flag) => setIsScrolle(flag);

  return (
    <div className={styles.homeTopWrapper}>
      <div className={styles.homeTopLeft}>
        <div className={styles.leftTop}>
          <Card>
            <img src={TeamLogo} alt="logo" />
            <Meta title="title" description="xxxxxxx" style={{ marginTop: 15 }} />
          </Card>
        </div>
        <div className={styles.leftBottom}>
          <Card hoverable={true}>
            <Statistic title="团队经费" value={1128} prefix={<LikeOutlined />} />
          </Card>
        </div>
      </div>
      <div className={styles.homeTopMid}>
        <div className={styles.midTop}>
          <Row justify="center" gutter={10}>
            <div className={styles.firstRow}>
              <Card hoverable={true}>
                运动员
                <br />
                #10
              </Card>
              <Card hoverable={true}>
                管理员
                <br />
                #10
              </Card>
            </div>
            <div className={styles.secondRow}>
              <Card hoverable={true}>
                即将到来的比赛
                <br />
                #10
              </Card>
              <Card hoverable={true}>
                照片
                <br />
                #10
              </Card>
            </div>
          </Row>
        </div>
        <div className={styles.midBottom}>
          <Card hoverable={true}>
            <Badge dot>
              <NotificationOutlined />
            </Badge>
            <span style={{ marginLeft: 5 }}>公告</span>
            <List
              className={styles.listText}
              size="small"
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </div>
      </div>
      <div className={styles.homeTopRight}>
        <div className={styles.rightOne}>
          <Carousel style={{ marginBottom: 10 }} autoplay dotPosition="bottom">
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
        </div>
        <div className={styles.rightTwo}>
          <div className={styles.weather}>
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
          <div className={styles.personSay}>
            <Divider dashed className={styles.myText}>
              队员留言
            </Divider>
          </div>
          <div className={styles.runList}>
            <div className={styles.parent} ref={warper}>
              <div className={styles.child} ref={childDom1}>
                {list.map((item) => (
                  <li
                    key={item}
                    onMouseOver={() => hoverHandler(false)}
                    onMouseLeave={() => hoverHandler(true)}
                  >
                    {item}
                  </li>
                ))}
              </div>
              <div className={styles.child} ref={childDom2}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
