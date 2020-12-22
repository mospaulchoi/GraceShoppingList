import React from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Row from "../components/Row";
import _ from "lodash";
import moment from "moment";
import "moment/locale/ko";
import produce from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

moment.locale("ko");

const UpperBox = styled.View`
  flex: 2;
`;
const LowerBox = styled.View`
  flex: 3;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: blue;
  padding: 4px;
`;
const FavNameView = styled.TouchableOpacity``;
const FavName = styled.Text`
  font-size: 16px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  padding: 2px;
`;
const FavName2 = styled(FavName)`
  font-weight: bold;
  color: green;
`;
const ItemList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const ItemBox = styled.TouchableOpacity``;
const Item = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 4px;
  border: 1px solid darkgreen;
  background: lightcyan;
  margin-right: 5px;
  margin-bottom: 5px;
`;
const Button = styled.Button``;

function Favorite({ navigation }) {
  const [favList, setFavList] = React.useState([]);
  const [selFavList, setSelFavList] = React.useState([]);
  const [index, setIndex] = React.useState("");
  const [todayShoppingList, setTodayShoppingList] = React.useState([]);

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
      AsyncStorage.getItem("selFavList")
        .then((data) => {
          if (data !== null) {
            setSelFavList(JSON.parse(data));
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

  const store1 = (value) => {
    setFavList(value);
    AsyncStorage.setItem("favList", JSON.stringify(value));
  };

  const store2 = async () => {
    try {
      await AsyncStorage.removeItem("todayShoppingList");
    } catch {}
  };

  const store3 = (selFavList) => {
    AsyncStorage.setItem("todayShoppingList", JSON.stringify(selFavList));
  };

  const store4 = (value) => {
    AsyncStorage.setItem("selFavList", JSON.stringify(value));
  };

  return (
    <Container>
      <UpperBox>
        <Title>즐겨찾기 쇼핑 목록을 선택하세요!</Title>
        <Contents>
          {favList.map((e) => {
            return (
              <FavNameView
                key={e.id}
                onPress={() => {
                  setSelFavList([]);
                  setSelFavList(e.list);
                  const index = favList.indexOf(e);
                  setIndex(index);
                  store1(
                    produce(favList, (draft) => {
                      draft.map((item) => (item.selected = false));
                      draft[index].selected = true;
                    })
                  );
                }}
              >
                {e.selected === true ? (
                  <FavName2>{e.name}</FavName2>
                ) : (
                  <FavName>{e.name}</FavName>
                )}
              </FavNameView>
            );
          })}
        </Contents>
        <Row>
          <Button
            title="선택한 즐겨찾기 쇼핑 목록 삭제하기"
            color="purple"
            onPress={() => {
              Alert.alert(
                "안내말씀",
                "선택하신 즐겨찾기 쇼핑 목록이 삭제됩니다!\n\n정말 삭제하시겠습니까?",
                [
                  {
                    text: "취소",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: "삭제",
                    onPress: () => {
                      if (index !== "") {
                        store1(_.reject(favList, favList[index]));
                        setSelFavList([]);
                      } else {
                        Alert.alert(
                          "안내말씀",
                          "선택이 잘 안되었으니 다시 한 번 터치해서 선택해 주세요!"
                        );
                      }
                    },
                  },
                ],
                { cancelable: true }
              );
              navigation.navigate("Favorite");
            }}
          />
        </Row>
      </UpperBox>
      <LowerBox>
        <Title>선택한 즐겨찾기 쇼핑 목록</Title>
        <Contents>
          <ItemList>
            {selFavList !== [] ? (
              selFavList.map((e) => (
                <ItemBox key={e.id}>
                  <Item>{e.item}</Item>
                </ItemBox>
              ))
            ) : (
              <ItemBox>
                <Item />
              </ItemBox>
            )}
          </ItemList>
        </Contents>
        <Row>
          <Button
            title="홈"
            color="purple"
            onPress={() => {
              store4(selFavList);
              navigation.navigate("Home");
            }}
          />
          <Button
            title="이전 쇼핑 목록"
            onPress={() => {
              store4(selFavList);
              navigation.navigate("Old");
            }}
          />
          <Button
            title="오늘의 쇼핑 목록으로 전송"
            color="green"
            onPress={() => {
              store2();
              store3(selFavList);
              store4(selFavList);
              navigation.navigate("Today");
            }}
          />
        </Row>
      </LowerBox>
    </Container>
  );
}

export default Favorite;
