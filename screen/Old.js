import React from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Row from "../components/Row";
import _ from "lodash";
import produce from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Localized, init } from "../i18n/Localized";

init();

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
        <Title>{Localized("026")}</Title>
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
            title={Localized("027")}
            color="purple"
            onPress={() => {
              if (index !== "") {
                Alert.alert(
                  Localized("000"),
                  Localized("028"),
                  [
                    {
                      text: Localized("029"),
                      onPress: () => {},
                      style: "cancel",
                    },
                    {
                      text: Localized("030"),
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
                Alert.alert(Localized("000"), Localized("031"));
              }
            }}
          />
          <Button
            title={Localized("032")}
            onPress={() => {
              try {
                store3(oldShoppingList[index].list);
                store4(oldShoppingList[index].list);
                navigation.navigate("Name");
              } catch (error) {
                Alert.alert(Localized("000"), Localized("031"));
              }
            }}
          />
        </Row>
      </UpperBox>
      <LowerBox>
        <Title>{Localized("033")}</Title>
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
            title={Localized("0211")}
            color="purple"
            onPress={() => {
              store4(spDayList);
              navigation.navigate("Home");
            }}
          />
          <Button
            title={Localized("0051")}
            color="orange"
            onPress={() => {
              store4(spDayList);
              navigation.navigate("Favorite");
            }}
          />
          <Button
            title={Localized("034")}
            onPress={() => {
              if (index !== "") {
                store2(spDayList);
                store4(spDayList);
                navigation.navigate("Edit");
              } else {
                Alert.alert(Localized("000"), Localized("031"));
                navigation.navigate("Old");
              }
            }}
          />
          <Button
            title={Localized("035")}
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
