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
        <Title>{Localized("036")}</Title>
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
            title={Localized("037")}
            color="purple"
            onPress={() => {
              Alert.alert(
                Localized("000"),
                Localized("038"),
                [
                  {
                    text: Localized("029"),
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: Localized("030"),
                    onPress: () => {
                      if (index !== "") {
                        store1(_.reject(favList, favList[index]));
                        setSelFavList([]);
                      } else {
                        Alert.alert(Localized("000"), Localized("039"));
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
        <Title>{Localized("040")}</Title>
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
            title={Localized("0211")}
            color="purple"
            onPress={() => {
              store4(selFavList);
              navigation.navigate("Home");
            }}
          />
          <Button
            title={Localized("0061")}
            onPress={() => {
              store4(selFavList);
              navigation.navigate("Old");
            }}
          />
          <Button
            title={Localized("041")}
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
