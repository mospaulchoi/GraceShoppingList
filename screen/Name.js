import React from "react";
import { Alert, Keyboard } from "react-native";
import styled from "styled-components/native";
import Container from "../components/Container";
import Row from "../components/Row";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Localized, init } from "../i18n/Localized";

init();

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
  text-align: center;
  margin-bottom: 10px;
  line-height: 20px;
  padding-left: 4px;
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
        <Text>{Localized("043")}</Text>
        <Row>
          <Input
            placeholder={Localized("044")}
            value={favName}
            onChangeText={(favName) => setFavName(favName)}
          />
          <Button
            title={Localized("045")}
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
                Alert.alert(Localized("000"), Localized("046"));
                navigation.navigate("Name");
              }
            }}
          />
        </Row>
      </Contents>
      <Row>
        <Button
          title={Localized("0211")}
          color="purple"
          onPress={() => navigation.navigate("Home")}
        />
        <Button
          title={Localized("0061")}
          onPress={() => {
            navigation.navigate("Old");
          }}
        />
        <Button
          title={Localized("0051")}
          color="orange"
          onPress={() => {
            navigation.navigate("Favorite");
          }}
        />
      </Row>
    </Container>
  );
}

export default Name;
