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
  const [todayShoppingList, setTodayShoppingList] = React.useState([]);
  const [favList, setFavList] = React.useState([]);
  const [shoppingList, setShoppingList] = React.useState([]);

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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("todayShoppingList")
        .then((data) => {
          if (data !== null) {
            setTodayShoppingList(JSON.parse(data));
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("favList")
        .then((data) => {
          if (data !== null) {
            setFavList(JSON.parse(data));
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("shoppingList")
        .then((data) => {
          if (data !== null) {
            setShoppingList(JSON.parse(data));
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
                if (todayShoppingList.length === 0) {
                  Alert.alert(
                    "안내말씀",
                    "오늘의 쇼핑 목록이 아직 없습니다.\n'사용 설명서'를 먼저 읽어 주시고,\n'새 쇼핑 목록 만들기'로부터 시작해 주세요!",
                    [
                      {
                        text: "사용 설명서 보기",
                        onPress: () => {
                          navigation.navigate("Manual");
                        },
                      },
                      {
                        text: "새 쇼핑 목록 만들기",
                        onPress: () => {
                          navigation.navigate("New");
                        },
                      },
                    ],
                    { cancelable: true }
                  );
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
                if (favList.length === 0) {
                  Alert.alert(
                    "안내말씀",
                    "즐겨찾기 쇼핑 목록이 아직 없습니다.\n'사용 설명서'를 먼저 읽어 주시고,\n'새 쇼핑 목록 만들기'로부터 시작해 주세요!",
                    [
                      {
                        text: "사용 설명서 보기",
                        onPress: () => {
                          navigation.navigate("Manual");
                        },
                      },
                      {
                        text: "새 쇼핑 목록 만들기",
                        onPress: () => {
                          navigation.navigate("New");
                        },
                      },
                    ],
                    { cancelable: true }
                  );
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
                    "이전 쇼핑 목록이 아직 없습니다.\n'사용 설명서'를 먼저 읽어 주시고,\n'새 쇼핑 목록 만들기'로부터 시작해 주세요!",
                    [
                      {
                        text: "사용 설명서 보기",
                        onPress: () => {
                          navigation.navigate("Manual");
                        },
                      },
                      {
                        text: "새 쇼핑 목록 만들기",
                        onPress: () => {
                          navigation.navigate("New");
                        },
                      },
                    ],
                    { cancelable: true }
                  );
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
                    "와우!\n첫 쇼핑 목록 만들기를 축하드립니다!\n\n혹시 '사용 설명서'를 아직 안 보셨다면\n꼭 먼저 보시기를 바랍니다!",
                    [
                      {
                        text: "사용 설명서 보기",
                        onPress: () => {
                          navigation.navigate("Manual");
                        },
                      },
                      {
                        text: "새 쇼핑 목록 만들기",
                        onPress: () => {
                          navigation.navigate("New");
                        },
                      },
                    ],
                    { cancelable: true }
                  );
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
