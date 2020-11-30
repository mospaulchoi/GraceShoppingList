import React from "react";
import { Alert, Keyboard } from "react-native";
import styled from "styled-components/native";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Row from "../components/Row";
import products_kor from "../products/products_kor.json";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const Button = styled.Button``;
const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: blue;
  text-align: center;
  padding: 4px;
`;
const UnitBox = styled.View``;
const SectionView = styled.View`
  background: lightgreen;
  border: 1px solid blue;
  margin-bottom: 4px;
`;
const Section = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 4px;
`;
const ItemBox = styled.TouchableOpacity``;
const Item = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 4px;
  border: 1px solid darkgreen;
  background: lightcyan;
  margin-right: 4px;
  margin-bottom: 4px;
`;
const ShoppingItemBox = styled.TouchableOpacity``;
const ShoppingItem = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 4px;
  border: 1px solid darkgreen;
  background: lightcyan;
  margin-right: 4px;
  margin-bottom: 4px;
`;
const DeleteBox = styled.TouchableOpacity`
  width: 20%;
`;
const Input = styled.TextInput`
  border: 1px solid dodgerblue;
  width: 80%;
  padding: 4px;
  height: 35px;
  font-size: 16px;
`;

function Edit({ navigation }) {
  const [editShoppingList, setEditShoppingList] = React.useState([]);
  const [text, setText] = React.useState("");
  const [oldShoppingList, setOldShoppingList] = React.useState([]);
  const [todayShoppingList, setTodayShoppingList] = React.useState([]);
  const [spDayList, setSpDayList] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("editShoppingList")
        .then((data) => {
          if (data !== null) {
            setEditShoppingList(JSON.parse(data));
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    AsyncStorage.getItem("oldShoppingList")
      .then((data) => {
        if (data !== null) {
          setOldShoppingList(JSON.parse(data));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const store1 = (newShoppingItem) => {
    setEditShoppingList(newShoppingItem);
    AsyncStorage.setItem("editShoppingList", JSON.stringify(newShoppingItem));
  };

  const store2 = (selSpDayList) => {
    setOldShoppingList(selSpDayList);
    AsyncStorage.setItem("oldShoppingList", JSON.stringify(selSpDayList));
  };

  const store3 = (editShoppingList) => {
    setSpDayList(editShoppingList);
    AsyncStorage.setItem("spDayList", JSON.stringify(editShoppingList));
  };

  const store4 = (editShoppingList) => {
    setTodayShoppingList(editShoppingList);
    AsyncStorage.setItem("todayShoppingList", JSON.stringify(editShoppingList));
  };

  const store5 = async () => {
    try {
      await AsyncStorage.removeItem("editShoppingList");
    } catch {}
  };

  const remove = async () => {
    const keys = ["todayShoppingList", "spDayList"];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Title>상품 메뉴: 터치하면 목록에 추가됨!</Title>
      <Contents>
        {products_kor.map((e) => {
          return (
            <UnitBox key={e.section.toString()}>
              <SectionView>
                <Section>{e.section}</Section>
              </SectionView>
              <Row>
                {e.products.map((product) => {
                  return (
                    <ItemBox
                      key={product.toString()}
                      onPress={() => {
                        const shoppingItem = {
                          id: new Date().getTime().toString(),
                          item: product,
                          buyed: false,
                        };
                        if (
                          editShoppingList.find(
                            (element) => element.item === product
                          ) === undefined
                        ) {
                          store1([...editShoppingList, shoppingItem]);
                        } else {
                          Alert.alert("안내말씀", "이미 추가되었습니다!");
                        }
                      }}
                    >
                      <Item>{product}</Item>
                    </ItemBox>
                  );
                })}
              </Row>
            </UnitBox>
          );
        })}
      </Contents>
      <Row>
        <Title>새 쇼핑 목록: 터치하면 삭제됨!</Title>
        <DeleteBox>
          <Button
            title="전체삭제"
            color="purple"
            onPress={() => {
              setEditShoppingList([]);
            }}
          />
        </DeleteBox>
      </Row>
      <Contents>
        <Row>
          {editShoppingList.map((e) => {
            return (
              <ShoppingItemBox
                key={e.id}
                onPress={() => {
                  store1(
                    _.reject(editShoppingList, (item) => item.id === e.id)
                  );
                }}
              >
                <ShoppingItem>{e.item}</ShoppingItem>
              </ShoppingItemBox>
            );
          })}
        </Row>
      </Contents>
      <Row>
        <Input
          placeholder="메뉴에 없는 상품명을 이곳에 쓰세요!"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button
          title="추가"
          onPress={() => {
            if (text !== "") {
              const editAddItem = {
                id: new Date().getTime().toString(),
                item: text,
                buyed: false,
              };
              if (
                editShoppingList.find(
                  (element) => element.item === editAddItem.item
                ) === undefined
              ) {
                store1([...editShoppingList, editAddItem]);
                setText("");
                Keyboard.dismiss();
              } else {
                Alert.alert("안내말씀", "이미 추가되었습니다!");
                setText("");
              }
            }
          }}
        />
      </Row>
      <Row>
        <Button
          title="홈"
          color="purple"
          onPress={() => {
            store5();
            navigation.navigate("Home");
          }}
        />
        <Button
          title="이전 쇼핑 목록"
          onPress={() => {
            store5();
            navigation.navigate("Old");
          }}
        />
        <Button
          title="수정 쇼핑 목록 저장"
          color="green"
          onPress={() => {
            if (editShoppingList.length === 0) {
              Alert.alert("안내말씀", "빈 쇼핑 목록은 저장하지 않습니다!");
              navigation.navigate("Edit");
            } else {
              store2(
                oldShoppingList.map((e) => {
                  e.selected = false;
                })
              );
              store2([
                ...oldShoppingList,
                {
                  id: new Date().getTime().toString(),
                  date: moment().format("YYYY-MM-DD. dddd. a hh:mm:ss."),
                  list: editShoppingList,
                  selected: true,
                },
              ]);
              remove();
              store3(editShoppingList);
              store4(editShoppingList);
              store5();
              navigation.navigate("Today");
            }
          }}
        />
      </Row>
    </Container>
  );
}

export default Edit;
