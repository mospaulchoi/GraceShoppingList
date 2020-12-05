import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Row1 = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Title1 = styled.Text`
  padding-top: 40px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: darkblue;
`;
const Title2View = styled.View`
  width: 45%;
  padding-right: 10px;
`;
const Title2 = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: right;
  color: darkgreen;
`;
const Title3View = styled.View`
  width: 55%;
  padding-left: 10px;
`;
const Title3 = styled.Text`
  font-size: 45px;
  font-weight: bold;
  text-align: left;
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
  const [oldShoppingList, setOldShoppingList] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("oldShoppingList")
        .then((data) => {
          if (data !== null) {
            setOldShoppingList(JSON.parse(data));
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Image source={require("../assets/cosmos.jpg")}>
        <Title1>Shopping List App</Title1>
        <Row1>
          <Title2View>
            <Title2>for</Title2>
          </Title2View>
          <Title3View>
            <Title3>You</Title3>
          </Title3View>
        </Row1>
        <Row>
          <ButtonView1>
            <Button
              title="오늘의 쇼핑 목록"
              onPress={() => {
                if (oldShoppingList.length === 0) {
                  Alert.alert(
                    "안내말씀",
                    "오늘의 쇼핑 목록이 아직 없습니다.\n사용 설명서를 먼저 읽어 주시고,\n'새 쇼핑 목록 만들기'로부터 시작해 주세요!"
                  );
                  navigation.navigate("Home");
                } else {
                  navigation.navigate("Today");
                }
              }}
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
              onPress={() => {
                if (oldShoppingList.length === 0) {
                  Alert.alert(
                    "안내말씀",
                    "즐겨찾기 쇼핑 목록이 아직 없습니다.\n사용 설명서를 먼저 읽어 주시고,\n'새 쇼핑 목록 만들기'로부터 시작해 주세요!"
                  );
                  navigation.navigate("Home");
                } else {
                  navigation.navigate("Favorite");
                }
              }}
            />
            <Interval />
            <Button
              title="이전 쇼핑 목록 보기"
              onPress={() => {
                if (oldShoppingList.length === 0) {
                  Alert.alert(
                    "안내말씀",
                    "이전 쇼핑 목록이 아직 없습니다.\n사용 설명서를 먼저 읽어 주시고,\n'새 쇼핑 목록 만들기'로부터 시작해 주세요!"
                  );
                  navigation.navigate("Home");
                } else {
                  navigation.navigate("Old");
                }
              }}
            />
            <Interval />
            <Button
              title="새 쇼핑 목록 만들기"
              onPress={() => {
                if (oldShoppingList.length === 0) {
                  Alert.alert(
                    "안내말씀",
                    "와우!\n첫 쇼핑 목록 만들기를\n진심으로 축하드립니다!!!!!!!"
                  );
                  navigation.navigate("New");
                } else {
                  navigation.navigate("New");
                }
              }}
            />
          </ButtonView2>
        </Row>
      </Image>
    </Container>
  );
}

export default Home;
