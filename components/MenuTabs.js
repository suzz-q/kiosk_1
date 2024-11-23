import React, { useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Button } from 'react-native';
import MenuList from './MenuList'; // 메뉴 데이터 가져오기

function MenuScreen({ data, onMenuSelect }) {
  const renderItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      {/* 메뉴 아이템 */}
      <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuSelect(item)}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.price}>{item.price}원</Text>
      </TouchableOpacity>

       {/* 설명 박스 */}
       <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>{item.description || `${item.name}에 대한 설명입니다.`}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      key={`numColumns-${2}`}
      numColumns={2}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

// 탭 네비게이터 생성
const Tab = createMaterialTopTabNavigator();

export default function MenuTabs({ navigation }) {
  const [selectedMenu, setSelectedMenu] = useState(null); // 선택한 메뉴 상태
  const [modalVisible, setModalVisible] = useState(false); // 팝업 화면 상태
  const [isPaidToggleOpen, setIsPaidToggleOpen] = useState(false); // 유료추가 토글 상태
  const [cart, setCart] = useState([]); // 장바구니 상태

  const [remainingTime, setRemainingTime] = useState(300);//시간 300초로 설정
  // 타이머 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Initial' }], // 'Initial' 화면으로 돌아감
          });
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);
  // 메뉴 선택 시 팝업 열기
  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu); // 선택한 메뉴 설정
    setModalVisible(true); // 팝업 열기
  };

  // 유료추가 토글
  const handleExtraSelect = (extra) => {
    if (extra === '샷 추가') {
      setSelectedMenu((prevMenu) => ({
        ...prevMenu,
        price: prevMenu.price + 500, // 가격 500원 증가
        extras: [...(prevMenu.extras || []), extra],
      }));
    }
  };
  
  const handlePaidToggle = () => {
    setIsPaidToggleOpen(!isPaidToggleOpen); // 열기/닫기 상태 변경
  };
  // 팝업 닫기
  const handleModalClose = () => {
    setModalVisible(false); // 팝업 닫기
    setIsPaidToggleOpen(false); // 토글 초기화
  };

  // 담기 버튼 클릭 시 장바구니에 추가
  const handleAddToCart = () => {
    const extras = isPaidToggleOpen ? ['샷 추가'] : []; // 유료추가 항목 예시
    setCart((prevCart) => [...prevCart, { ...selectedMenu, extras }]); // 선택한 메뉴와 추가 옵션 장바구니에 추가
    handleModalClose(); // 팝업 닫기
  };

  // 장바구니 총 가격 계산
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const totalItems = cart.length;

  return (
    <View style={{ flex: 1 }}>
      {/* 탭 네비게이터 */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: '#555',
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#f5f5f5' },
          tabBarIndicatorStyle: { backgroundColor: '#007bff' },
        }}
      >
        <Tab.Screen name="커피">
          {() => <MenuScreen data={MenuList.coffee} onMenuSelect={handleMenuSelect} />}
        </Tab.Screen>
        <Tab.Screen name="카페인X커피">
          {() => <MenuScreen data={MenuList.decaf} onMenuSelect={handleMenuSelect} />}
        </Tab.Screen>
        <Tab.Screen name="음료">
          {() => <MenuScreen data={MenuList.juice} onMenuSelect={handleMenuSelect} />}
        </Tab.Screen>
        <Tab.Screen name="차">
          {() => <MenuScreen data={MenuList.tea} onMenuSelect={handleMenuSelect} />}
        </Tab.Screen>
        <Tab.Screen name="곁들임">
          {() => <MenuScreen data={MenuList.food} onMenuSelect={handleMenuSelect} />}
        </Tab.Screen>
        <Tab.Screen name="상품">
          {() => <MenuScreen data={MenuList.products} onMenuSelect={handleMenuSelect} />}
        </Tab.Screen>
      </Tab.Navigator>

      {/* 팝업 화면 */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* 선택한 메뉴 표시 */}
            {selectedMenu && (
              <View style={styles.selectedMenu}>
                <Image source={selectedMenu.image} style={styles.selectedMenuImage} />
                <Text style={styles.selectedMenuName}>{selectedMenu.name}</Text>
                <Text style={styles.selectedMenuPrice}>{selectedMenu.price}원</Text>
              </View>
            )}

            {/* 유료추가 버튼 */}
            <TouchableOpacity 
                style={styles.toggleButton} 
                onPress={handlePaidToggle}
            >
                <Text style={styles.toggleButtonText}>
                    {isPaidToggleOpen ? '유료추가 접기' : '유료추가 열기'}
                </Text>
            </TouchableOpacity>
            {isPaidToggleOpen && (
                <View style={styles.extraOptions}>
                    <TouchableOpacity 
                        style={styles.extraOption} 
                        onPress={() => handleExtraSelect('샷 추가')}
                    >
                        <Text style={styles.optionText}>샷 추가: +500원</Text>
                    </TouchableOpacity>
                </View>
            )}


            {/* 담기 버튼 */}
            <Button title="담기" onPress={handleAddToCart} />
          </View>
        </View>
      </Modal>

      {/* 하단 UI */}
      <View style={styles.footer}>
        {/* 장바구니 */}
        <View style={styles.cartContainer}>
          <Text style={styles.cartTitle}>장바구니</Text>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => setCart((prevCart) => prevCart.filter((i) => i !== item))}
              >
                <View style={styles.cartItem}>
                  <Image source={item.image} style={styles.cartImage} />
                  <Text style={styles.cartText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            horizontal
            contentContainerStyle={styles.cartList}
          />
        </View>

        {/* 오른쪽: 수량, 총 가격, 다음 버튼 */}
        <View style={styles.rightContainer}>
        <Text style={styles.timerText}>남은 시간: {remainingTime}초</Text>
          <Text style={styles.totalInfo}>수량: {totalItems}개</Text>
          <Text style={styles.totalInfo}>총 가격: {totalPrice}원</Text>
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.nextButtonText}>다음으로</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    listContainer: { 
        padding: 10, 
        paddingHorizontal: 15, // 가로 패딩 추가
      },
    menuItemContainer: {
        flexDirection: 'row', // 가로 배치
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    menuItem: {
        flex: 2, // 메뉴 항목에 더 많은 공간 할당
        alignItems: 'center',
        justifyContent: 'center',
    },

    descriptionBox: {
        flex: 3, // 설명 박스에 더 많은 공간 할당
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
  descriptionText: {
    fontSize: 14,
    color: '#555',
  },

  image: { 
    width: 80, 
    height: 80, 
    marginBottom: 10},

  menuName: { 
    fontSize: 16, 
    fontWeight: 'bold' },
    
  price: { fontSize: 14, color: '#555' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedMenu: { alignItems: 'center', marginBottom: 20 },
  selectedMenuImage: { width: 100, height: 100, marginBottom: 10 },
  selectedMenuName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  selectedMenuPrice: { fontSize: 16, color: '#555' },
  toggleButton: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  toggleButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  extraOptions: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  optionText: { fontSize: 14, color: '#333' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    height : 110,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cartContainer: { 
    flex: 2,
    paddingRight : 15,
  },
  cartTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  cartItem: { alignItems: 'center', marginRight: 10 },
  cartImage: { width: 50, height: 50, borderRadius: 5 },
  cartText: { fontSize: 12 },
  rightContainer: { flex: 1, alignItems: 'flex-end' },
  totalInfo: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 5 },
  nextButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  tabBarLabelStyle: {
    fontSize: 18, // 텍스트 크기 증가
    fontWeight: 'bold',
    textTransform: 'none', // 소문자 유지
  },
  tabBarStyle: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8, // 세로 패딩 추가
  },
});
