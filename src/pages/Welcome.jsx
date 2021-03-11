import React, { useRef, useState, useEffect } from 'react';
import { Row, Col, Carousel, Statistic, Divider, List, Badge, Card } from 'antd';
import { LikeOutlined, ArrowUpOutlined, NotificationOutlined } from '@ant-design/icons';
import TeamLogo from '../assets/logo.png';
import styles from './Welcome.less';
import { connect } from 'umi';

const { Meta } = Card;

const Welcome = ({ dispatch, team }) => {
  const [isScrolle, setIsScrolle] = useState(true);

  const [teamTitle, setTeamTitle] = useState('');
  const [teamManagers, setTeamManagers] = useState(0);
  const [teamPlayers, setTeamPlayers] = useState(0);
  const [teamPhotos, setTeamPhotos] = useState(0);
  const [teamComingMatch, setTeamComingMatch] = useState(0);
  const [teamDiscription, setTeamDiscription] = useState('');
  const [teamAnnouncements, setTeamAnnounce] = useState([]);
  const [weather, setWeather] = useState({});
  const [autoScrollList, setAutoScrollList] = useState([]);
  const [slideShow, setSlideShow] = useState([]);

  // 滚动速度，值越小，滚动越快
  const speed = 30;
  const warper = useRef();
  const childDom1 = useRef();
  const childDom2 = useRef();

  useEffect(() => {
    dispatch({
      type: 'welcome/getMainInfo',
    });
  }, []);

  useEffect(() => {
    const {
      title,
      managers,
      players,
      photos,
      comingMatch,
      discription,
      announcement,
      weather,
      autoScrollList,
      slideShow,
    } = team.mainInfo;
    console.log(team);

    setTeamTitle(title);
    setTeamManagers(managers);
    setTeamPlayers(players);
    setTeamComingMatch(comingMatch);
    setTeamDiscription(discription);
    setTeamPhotos(photos);
    setTeamAnnounce(announcement);
    setWeather(weather);
    setAutoScrollList(autoScrollList);
    setSlideShow(slideShow);
  }, [team]);

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
            <Meta title={teamTitle} description={teamDiscription} style={{ marginTop: 15 }} />
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
                <br />#{teamPlayers}
              </Card>
              <Card hoverable={true}>
                管理员
                <br />#{teamManagers}
              </Card>
            </div>
            <div className={styles.secondRow}>
              <Card hoverable={true}>
                即将到来的比赛
                <br />#{teamComingMatch}
              </Card>
              <Card hoverable={true}>
                照片
                <br />#{teamPhotos}
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
              dataSource={teamAnnouncements}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </div>
      </div>
      <div className={styles.homeTopRight}>
        <div className={styles.rightOne}>
          <Carousel style={{ marginBottom: 10 }} autoplay dotPosition="bottom">
            {slideShow &&
              slideShow.map((item, index) => {
                return (
                  <div className={styles.carouselItem} key={index}>
                    <img src={item} alt={index} />
                  </div>
                );
              })}
          </Carousel>
        </div>
        <div className={styles.rightTwo}>
          <div className={styles.weather}>
            <Row gutter={10}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="今日气温"
                    value={weather && weather.today}
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
                    value={weather && weather.tomorrow}
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
                {autoScrollList &&
                  autoScrollList.map((item) => (
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

export default connect(({ welcome, loading }) => ({
  team: welcome,
  submitting: loading.effects['welcome/getMainInfo'],
}))(Welcome);
