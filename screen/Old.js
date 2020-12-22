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
const DateView = styled.TouchableOpacity``;
const Date = styled.Text`
  font-size: 16px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  padding: 2px;
`;
const Date2 = styled(Date)`
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

function Old({ navigation }) {
  const [oldShoppingList, setOldShoppingList] = React.useState([]);
  const [spDayList, setSpDayList] = React.useState([]);
  const [index, setIndex] = React.useState("");
  const [editShoppingList, setEditShoppingList] = React.useState([]);
  const [tempList, setTempList] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("spDayList")
        .then((data) => {
          if (data !== null) {
            setSpDayList(JSON.parse(data));
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
    AsyncStorage.getItem("editShoppingList")
      .then((data) => {
        if (data !== null) {
          setEditShoppingList(JSON.parse(data));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  React.useEffect(() => {
    AsyncStorage.getItem("tempList")
      .then((data) => {
        if (data !== null) {
          setTempList(JSON.parse(data));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const store1 = (shoppingList) => {
    setOldShoppingList(shoppingList);
    AsyncStorage.setItem("oldShoppingList", JSON.stringify(shoppingList));
  };

  const store2 = (spDayList) => {
    setEditShoppingList(spDayList);
    AsyncStorage.setItem("editShoppingList", JSON.stringify(spDayList));
  };

  const store3 = (selOldShoppingList) => {
    setTempList(selOldShoppingList);
    AsyncStorage.setItem("tempList", JSON.stringify(selOldShoppingList));
  };

  const store4 = (value) => {
    AsyncStorage.setItem("spDayList", JSON.stringify(value));
  };

  return (
    <Container>
      <UpperBox>
        <Title>날짜를 선택하세요!</Title>
        <Contents>
          {oldShoppingList.map((e) => {
            return (
              <DateView
                key={e.id}
                onPress={() => {
                  setSpDayList([]);
                  setSpDayList(e.list);
                  const index = oldShoppingList.indexOf(e);
                  setIndex(index);
                  store1(
                    produce(oldShoppingList, (draft) => {
                      draft.map((item) => (item.selected = false));
                      draft[index].selected = true;
                    })
                  );
                }}
              >
                {e.selected === true ? (
                  <Date2>{e.date}</Date2>
                ) : (
                  <Date>{e.date}</Date>
                )}
              </DateView>
            );
          })}
        </Contents>
        <Row>
          <Button
            title="선택 목록 삭제"
            color="purple"
            onPress={() => {
              if (index !== "") {
                Alert.alert(
                  "안내말씀",
                  "선택하신 날짜의 쇼핑 목록이 삭제됩니다!\n\n정말 삭제하시겠습니까?",
                  [
                    {
                      text: "취소",
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: "삭제",
                      onPress: () => {
                        store1(
                          _.reject(oldShoppingList, oldShoppingList[index])
                        );
                        setSpDayList([]);
                      },
                    },
                  ],
                  { cancelable: true }
                );
                navigation.navigate("Old");
              } else {
                Alert.alert(
                  "안내말씀",
                  "빈 쇼핑 목록이거나 선택이 잘 안되었으니 다시 한 번 터치해서 선택해 주세요!"
                );
              }
            }}
          />
          <Button
            title="선택 목록 즐겨찾기에 추가"
            onPress={() => {
              try {
                store3(oldShoppingList[index].list);
                store4(oldShoppingList[index].list);
                navigation.navigate("Name");
              } catch (error) {
                Alert.alert(
                  "안내말씀",
                  "빈 쇼핑 목록이거나 선택이 잘 안되었으니 다시 한 번 터치해서 선택해 주세요!"
                );
              }
            }}
          />
        </Row>
      </UpperBox>
      <LowerBox>
        <Title>선택한 날짜의 쇼핑 목록</Title>
        <Contents>
          <ItemList>
            {oldShoppingList !== [] ? (
              spDayList.map((e) => (
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
              store4(spDayList);
              navigation.navigate("Home");
            }}
          />
          <Button
            title="즐겨찾기"
            onPress={() => {
              store4(spDayList);
              navigation.navigate("Favorite");
            }}
          />
          <Button
            title="선택 목록 수정"
            onPress={() => {
              if (index !== "") {
                store2(spDayList);
                store4(spDayList);
                navigation.navigate("Edit");
              } else {
                Alert.alert(
                  "안내말씀",
                  "빈 쇼핑 목록이거나 선택이 잘 안되었으니 다시 한 번 터치해서 선택해 주세요!"
                );
                navigation.navigate("Old");
              }
            }}
          />
          <Button
            title="새 목록 작성"
            color="green"
            onPress={() => {
              if (oldShoppingList.length === 0) {
                Alert.alert("안내말씀", "첫 쇼핑 목록 만들기를 축하드립니다!");
                navigation.navigate("New");
              } else {
                navigation.navigate("New");
              }
            }}
          />
        </Row>
      </LowerBox>
    </Container>
  );
}

export default Old;
