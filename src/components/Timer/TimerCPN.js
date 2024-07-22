import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Row from '../Row';
import moment from 'moment';

const TimerComponent = targetTimeInput => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Tính thời gian
      const now = new Date();
      const targetTime = new Date(moment(targetTimeInput)); // Thời gian đích

      const timeDifference = targetTime - now;
     
      if (timeDifference <= 0) {
        clearInterval(timer); // Dừng timer khi đã đạt thời gian đích
      } else {
        const totalSeconds = Math.floor(timeDifference / 1000);
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        setHours(h);
        setMinutes(m);
        setSeconds(s);
      }
    }, 1000); // Cứ mỗi 1 giây cập nhật thời gian

    return () => clearInterval(timer); // Hủy timer khi component bị unmount
  }, []);

  return (
    <Row crossAxisAlignment={'center'}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {hours > 24 ? 24 : hours < 10 ? `0${hours}` : hours}
        </Text>
      </View>
      <Text style={{paddingHorizontal: 5, color:'white'}}>:</Text>
      <View style={styles.container}>
        <Text style={styles.text}>
          {minutes < 10 ? `0${minutes}` : minutes}
        </Text>
      </View>
      <Text style={{paddingHorizontal: 5, color:'white'}}>:</Text>
      <View style={styles.container}>
        <Text style={styles.text}>
          {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      </View>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimerComponent;
