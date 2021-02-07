import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import Container from "../components/Container";
import Row from "../components/Row";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Localized, init } from "../i18n/Localized";

init();

const Contents = styled.ScrollView`
  flex: 1;
`;
const TextBox = styled.View`
  padding: 4px 4px 20px 4px;
  border: 1px solid dodgerblue;
  margin-bottom: 4px;
  background: lightcyan;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: blue;
  margin-bottom: 10px;
`;
const Text = styled.Text`
  font-size: 16px;
  line-height: 25px;
`;
const ButtonBox = styled.TouchableOpacity``;
const Interval = styled.View`
  height: 10px;
`;
const Button = styled.Button`
  margin-top: 10px;
`;

function Manual({ navigation }) {
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert(Localized("000"), Localized("047"));
    } catch {
      Alert.alert(Localized("000"), Localized("048"));
    }
  };

  return (
    <Container>
      <Contents>
        <TextBox>
          <Title>{Localized("051")}</Title>
          <Text>{Localized("052")}</Text>
        </TextBox>
        <TextBox>
          <Title>{Localized("053")}</Title>
          <Text>{Localized("054")}</Text>
          <Row>
            <ButtonBox>
              <Button
                title={Localized("055")}
                color="red"
                onPress={() => {
                  Alert.alert(
                    Localized("000"),
                    Localized("056"),
                    [
                      {
                        text: Localized("029"),
                        onPress: () => {},
                        style: "cancel",
                      },
                      { text: Localized("030"), onPress: () => clearStorage() },
                    ],
                    { cancelable: true }
                  );
                  navigation.navigate("Manual");
                }}
              />
            </ButtonBox>
          </Row>
        </TextBox>
        <Interval />
        <Row>
          <Button
            title={Localized("021")}
            color="purple"
            onPress={() => navigation.navigate("Home")}
          />
        </Row>
      </Contents>
    </Container>
  );
}

export default Manual;
