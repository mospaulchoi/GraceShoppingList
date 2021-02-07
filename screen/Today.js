import React from "react";
import styled from "styled-components/native";
import Container from "../components/Container";
import Contents from "../components/Contents";
import Row from "../components/Row";
import moment from "moment-with-locales-es6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import produce from "immer";
import { Localized, init } from "../i18n/Localized";
import { AdMobBanner } from "expo-ads-admob";

init();
moment.locale(Localized("060"));

const Today1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: blue;
  text-align: center;
`;
const Today2 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: green;
  text-align: center;
`;
const ItemBox = styled.TouchableOpacity``;
const Item1 = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 4px;
  border: 1px solid darkgreen;
  background: lightcyan;
  margin-right: 4px;
  margin-bottom: 4px;
`;
const Item2 = styled(Item1)`
  text-decoration: line-through;
  background: yellow;
`;
const Row2 = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 4px;
`;
const Button = styled.Button`
  margin-bottom: 4px;
`;
const BannerBox = styled.View`
  align-self: center;
  margin-top: 6px;
  margin-bottom: 10px;
`;

function Today({ navigation }) {
  const [todayShoppingList, setTodayShoppingList] = React.useState([]);
  const [shoppingList, setShoppingList] = React.useState([]);

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

  const store1 = (newShoppingList) => {
    setTodayShoppingList(newShoppingList);
    AsyncStorage.setItem("todayShoppingList", JSON.stringify(newShoppingList));
  };

  const store2 = async () => {
    try {
      await AsyncStorage.removeItem("shoppingList");
    } catch {}
  };

  const store3 = (todayShoppingList) => {
    AsyncStorage.setItem("shoppingList", JSON.stringify(todayShoppingList));
  };

  return (
    <Container>
      <Today1>{moment().format(Localized("058"))}</Today1>
      <Today2>{Localized("024")}</Today2>
      <Contents>
        <Row>
          {todayShoppingList.map((e) => (
            <ItemBox
              key={e.id}
              onPress={() => {
                store1(
                  produce(todayShoppingList, (draft) => {
                    const index = todayShoppingList.indexOf(e);
                    draft[index].buyed = !todayShoppingList[index].buyed;
                  })
                );
              }}
            >
              {e.buyed === false ? (
                <Item1>{e.item}</Item1>
              ) : (
                <Item2>{e.item}</Item2>
              )}
            </ItemBox>
          ))}
        </Row>
      </Contents>
      <BannerBox>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-6766978074816044/6591815540"
          servePersonalizedAds="true"
          onDidFailToReceiveAdWithError={(e) => console.log(e.message)}
        />
      </BannerBox>      
      <Row2>
        <Button
          title={Localized("0211")}
          color="purple"
          onPress={() => navigation.navigate("Home")}
        />
        <Button
          title={Localized("0061")}
          onPress={() => navigation.navigate("Old")}
        />
        <Button
          title={Localized("0051")}
          color="orange"
          onPress={() => navigation.navigate("Favorite")}
        />
        <Button
          title={Localized("025")}
          color="green"
          onPress={() => {
            store1(
              produce(todayShoppingList, (draft) => {
                draft.map((e) => (e.buyed = false));
              })
            );
            store2();
            store3(todayShoppingList);
            navigation.navigate("New");
          }}
        />
      </Row2>      
    </Container>
  );
}

export default Today;
