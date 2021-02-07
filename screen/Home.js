import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Localized, init } from "../i18n/Localized";

init();

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Row1 = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Title = styled.Text`
  padding-top: 40px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: violet;
  margin-top: 30px;
  margin-bottom: 30px;
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
  height: 10px;
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
        <Title>{Localized("001")}</Title>
        <Row>
          <ButtonView1>
            <Button
              title={Localized("004")}
              color="blue"
              onPress={() => {
                navigation.navigate("Today");
              }}
            />
            <Interval />
            <Button
              title={Localized("008")}
              color="purple"
              onPress={() => navigation.navigate("Manual")}
            />
          </ButtonView1>
          <ButtonView2>
            <Button
              title={Localized("005")}
              color="orange"
              onPress={() => {
                navigation.navigate("Favorite");
              }}
            />
            <Interval />
            <Button
              title={Localized("006")}
              color="red"
              onPress={() => {
                navigation.navigate("Old");
              }}
            />
            <Interval />
            <Button
              title={Localized("007")}
              color="green"
              onPress={() => {
                if (oldShoppingList.length === 0) {
                  Alert.alert(
                    Localized("0000"),
                    Localized("012"),
                    [
                      {
                        text: Localized("045"),
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
