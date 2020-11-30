import React from "react";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Title1 = styled.Text`
  padding-top: 40px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: darkblue;
`;
const Title2 = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: darkgreen;
`;
const Title3 = styled.Text`
  font-size: 45px;
  font-weight: bold;
  text-align: center;
  color: purple;
`;
const Image = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ButtonView1 = styled.View`
  margin-top: 5px;
  margin-left: 10px;
`;
const ButtonView2 = styled.View`
  margin-top: 5px;
  margin-right: 10px;
`;
const Button = styled.Button``;
const Interval = styled.View`
  height: 5px;
`;

function Home({ navigation }) {
  return (
    <Container>
      <Image source={require("../assets/cosmos.jpg")}>
        <Title1>Shopping List App</Title1>
        <Title2>for</Title2>
        <Title3>Grace</Title3>
        <Row>
          <ButtonView1>
            <Button
              title="오늘의 쇼핑 목록"
              onPress={() => navigation.navigate("Today")}
            />
            <Interval />
            <Button
              title="** 사용 설명서 **"
              color="purple"
              onPress={() => navigation.navigate("Manual")}
            />
          </ButtonView1>
          <ButtonView2>
            <Button
              title="즐겨찾기 쇼핑 목록"
              onPress={() => navigation.navigate("Favorite")}
            />
            <Interval />
            <Button
              title="이전 쇼핑 목록 보기"
              onPress={() => navigation.navigate("Old")}
            />
            <Interval />
            <Button
              title="새 쇼핑 목록 만들기"
              onPress={() => navigation.navigate("New")}
            />
          </ButtonView2>
        </Row>
      </Image>
    </Container>
  );
}

export default Home;
