import React from "react";
import { Alert, Keyboard } from "react-native";
import styled from "styled-components/native";
import Container from "../components/Container";
import Row from "../components/Row";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Contents = styled.View`
  flex: 1;
  padding: 4px;
  border: 1px solid dodgerblue;
  background: lightcyan;
  margin-bottom: 4px;
`;
const Text = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: blue;
  margin-bottom: 20px;
  text-align: center;
  line-height: 25px;
`;
const Input = styled.TextInput`
  width: 250px;
  border: 1px solid dodgerblue;
  padding: 4px;
  height: 35px;
  font-size: 16px;
`;
const Button = styled.Button``;

function Name({ navigation }) {
  const [tempList, setTempList] = React.useState([]);
  const [favList, setFavList] = React.useState([]);
  const [favName, setFavName] = React.useState("");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      AsyncStorage.getItem("tempList")
        .then((data) => {
          if (data !== null) {
            setTempList(JSON.parse(data));
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

  const store1 = (favItem) => {
    setFavList(favItem);
    AsyncStorage.setItem("favList", JSON.stringify(favItem));
  };

  const store2 = async (selFavItem) => {
    try {
      await AsyncStorage.setItem("selFavList", JSON.stringify(selFavItem));
    } catch (error) {
      alert(error.message);
    }
  };

  const store3 = async () => {
    try {
      await AsyncStorage.removeItem("tempList");
    } catch {}
  };

  return (
    <Container>
      <Contents>
        <Text>{`기억하기 편하신 이름으로 정해 주세요!\n예) 일상 쇼핑 목록, ㅇㅇ 생일, 추석 명절 등\n'확인' 버튼을 누르셔야 등록이 됩니다!`}</Text>
        <Row>
          <Input
            placeholder="여기에 써 주세요!"
            value={favName}
            onChangeText={(favName) => setFavName(favName)}
          />
          <Button
            title="확인"
            onPress={() => {
              if (
                favName !== "" &&
                favList.find((e) => e.name === favName) === undefined
              ) {
                store1(
                  favList.map((e) => {
                    e.selected = false;
                  })
                );
                store1([
                  ...favList,
                  {
                    id: new Date().getTime().toString(),
                    name: favName,
                    list: tempList,
                    selected: true,
                  },
                ]);
                store2(tempList);
                store3();
                setFavName("");
                Keyboard.dismiss();
                navigation.navigate("Favorite");
              } else {
                Alert.alert(
                  "안내말씀",
                  "빈 이름이거나 이미 동일한 이름이 존재합니다!"
                );
                navigation.navigate("Name");
              }
            }}
          />
        </Row>
      </Contents>
      <Row>
        <Button
          title="홈"
          color="purple"
          onPress={() => navigation.navigate("Home")}
        />
        <Button
          title="이전 쇼핑 목록"
          onPress={() => {
            navigation.navigate("Old");
          }}
        />
        <Button
          title="즐겨찾기 목록"
          color="green"
          onPress={() => {
            navigation.navigate("Favorite");
          }}
        />
      </Row>
    </Container>
  );
}

export default Name;
