import React from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import Container from "../components/Container";
import Row from "../components/Row";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const Button = styled.Button``;

function Manual({ navigation }) {
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert(
        "안내말씀",
        "전체 쇼핑 목록 기록이 성공적으로 삭제되었습니다!"
      );
    } catch {
      Alert.alert(
        "안내말씀",
        "전체 쇼핑 목록 기록 삭제를 실패하였습니다. 잠시 후 다시 시도해 주십시오!"
      );
    }
  };

  return (
    <Container>
      <Contents>
        <TextBox>
          <Title>*내용*</Title>
          <Text>{` 1. 필독사항\n 2. 전체 쇼핑 목록 기록 삭제하기\n 3. 개발후기\n`}</Text>
        </TextBox>
        <TextBox>
          <Title>*필독사항*</Title>
          <Text>{`- 맨 처음에는 '새 쇼핑 목록 만들기'로부터 시작하시면 됩니다.\n- '새 쇼핑 목록 만들기'는 기본 상품 메뉴에서 선택하시거나, 없는 항목은 직접 입력하여(필요시 수량도) 추가함으로 만드실 수 있습니다.\n- 새 쇼핑 목록을 만드신 후 '새 쇼핑 목록 저장'을 누르시면 '이전 쇼핑 목록'에 자동으로 등록됨과 동시에 '오늘의 쇼핑 목록'에 표시가 됩니다.\n- '오늘의 쇼핑 목록'을 이용해 쇼핑을 하시면서 구입하신 항목을 터치하시면 색이 바뀌면서 취소선이 생기므로 아직 구입하지 않은 항목을 쉽게 파악하실 수 있습니다. 구입한 항목을 한 번 더 터치하시면 구입하지 않은 항목으로 다시 바뀝니다.\n- 두번째부터는 '새 쇼핑 목록 만들기'를 이용하시거나 '이전 쇼핑 목록'을 이용해 필요한 수정(추가, 삭제)을 하신 후 '수정 목록 저장'을 누르시면 '이전 쇼핑 목록'에 자동으로 등록됨과 동시에 '오늘의 쇼핑 목록'에 표시가 됩니다.\n- '이전 쇼핑 목록' 중 원하시는 쇼핑 목록을 선택하여 '선택 목록 즐겨찾기에 추가'를 이용해 기억하기 편한 이름으로 등록하실 수 있습니다.\n- '즐겨찾기 쇼핑 목록'에서 '오늘의 쇼핑 목록으로 전송'을 눌러 쇼핑에 이용하시면 됩니다.\n- '오늘의 쇼핑 목록'에서 수정을 원하시면 '수정' 버튼을 눌러 필요한 수정을 하신 후 '새 쇼핑 목록 저장'을 하시면 수정된 쇼핑 목록이 '이전 쇼핑 목록'에 자동으로 등록됨과 동시에 '오늘의 쇼핑 목록'에 표시가 됩니다.\n- '이전 쇼핑 목록'에는 날짜와 시간과 함께 쇼핑 목록이 저장됩니다.\n- '즐겨찾기 쇼핑 목록' 만들기는 '이전 쇼핑 목록'의 선택을 통해서만 가능합니다.\n- 기본 상품 메뉴는 저희 가정이 러시아(모스크바)에 살면서 일상적으로 구입하는 상품을 위주로 구성하였사오니, 이를 참고하셔서 자신만의 기본 상품 메뉴를 '새 쇼핑 목록 만들기'로 만드신 후 저장하시고 '이전 쇼핑 목록'에 가서 선택하여 '즐겨찾기 쇼핑 목록'에 등록하신 후 이를 '오늘의 쇼핑 목록으로 전송'하여 이용하시면 되겠습니다. 그럼 즐거운 쇼핑 되시길 바랍니다! (^.^)`}</Text>
        </TextBox>
        <TextBox>
          <Title>*전체 쇼핑 목록 기록 삭제하기*</Title>
          <Text>{`  그동안 누적된 전체 쇼핑 목록 기록을 삭제하고 싶으신 경우 아래 버튼을 누르세요. 신중하게 생각하셔서 결정하세요! 즐겨찾기를 포함하여 그 동안 저장된 모든 쇼핑 목록 기록이 삭제됩니다!
              `}</Text>
          <Row>
            <ButtonBox>
              <Button
                title="전체 쇼핑 목록 기록 삭제하기"
                color="red"
                onPress={() => {
                  Alert.alert(
                    "안내말씀",
                    "즐겨찾기 쇼핑 목록을 포함한\n기존의 모든 쇼핑 목록이 삭제됩니다!\n\n정말 삭제하시겠습니까?",
                    [
                      {
                        text: "취소",
                        onPress: () => {},
                        style: "cancel",
                      },
                      { text: "삭제", onPress: () => clearStorage() },
                    ],
                    { cancelable: true }
                  );
                  navigation.navigate("Manual");
                }}
              />
            </ButtonBox>
          </Row>
        </TextBox>
        <TextBox>
          <Title>*개발후기*</Title>
          <Text>{`  이 쇼핑 목록 앱은 제가 프로그래밍을 공부하고 (JavaScript, React, React Native) 처음으로 만들어 본 앱입니다. 어떤 앱을 가장 먼저 만들어 볼까 생각하다가, 사랑하는 아내를 위해 시장보기 앱을 가장 먼저 만들어 보고자 하는 소원을 갖게 되었습니다. 시장 볼 항목을 늘 종이에 써서 들고 다니며 시장을 보는 아내를 보며 아주 실제적인 도움이 될 것이라 생각했습니다. 그러나 디지털 보다 아날로그에 좀 더 친숙한 아내가 이 앱을 즐겨 사용하게 될지는 아직 미지수입니다. (^.^) 어쨌든 저는 앱을 만드는 과정에서 이론적으로 배웠던 지식을 실제적으로 응용하면서 많은 공부가 되었습니다. 그것만으로도 충분하다는 생각이 듭니다. 그리고 아내 이외의 누군가에게도 도움이 되는 실용적인 앱이 된다면 무척 기쁠 것입니다. 이 앱을 사용하시면서 버그(프로그램상 오류)를 발견하시거나 수정, 개선, 요구사항 등이 있으시면 이메일이나 카톡으로 연락주시면 최대한 반영하도록 노력하겠습니다. 감사합니다. 첫 앱을 완성할 수 있도록 도와주신 하나님께 감사와 찬송과 영광을 돌려드립니다.\n\n  2020.12.1.\n\n  이메일: mospaulchoi@gmail.com\n  카톡: mospaulchoi\n`}</Text>
        </TextBox>
        <Row>
          <Button
            title="홈 화면으로!"
            color="purple"
            onPress={() => navigation.navigate("Home")}
          />
        </Row>
      </Contents>
    </Container>
  );
}

export default Manual;
