// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Button } from 'react-native';

// export default function MenuScreen({ data, onAddToCart }) {
//   const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 상태
//   const [modalVisible, setModalVisible] = useState(false); // 팝업 상태
//   const [isPaidToggleOpen, setIsPaidToggleOpen] = useState(false); // 유료추가 토글 상태

//   // 메뉴 선택 시 팝업 열기
//   const handleMenuSelect = (menu) => {
//     setSelectedMenu(menu);
//     setModalVisible(true);
//   };

//   // 유료추가 토글
//   const handlePaidToggle = () => {
//     setIsPaidToggleOpen(!isPaidToggleOpen);
//   };

//   // 유료추가 선택
//   const handleExtraSelect = (extra) => {
//     if (extra === '샷 추가') {
//       setSelectedMenu((prevMenu) => ({
//         ...prevMenu,
//         price: prevMenu.price + 500, // 샷 추가 시 가격 500원 증가
//       }));
//     }
//   };

//   // 팝업 닫기
//   const handleModalClose = () => {
//     setModalVisible(false);
//     setIsPaidToggleOpen(false); // 유료추가 토글 초기화
//   };

//   // 담기 버튼 클릭 시 장바구니에 추가
//   const handleAddToCart = () => {
//     onAddToCart(selectedMenu); // 선택된 메뉴를 장바구니에 추가
//     handleModalClose(); // 팝업 닫기
//   };

//   // 메뉴와 설명 박스 렌더링
//   const renderItem = ({ item }) => (
//     <View style={styles.menuItemContainer}>
//       {/* 메뉴 아이템 */}
//       <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuSelect(item)}>
//         <Image source={item.image} style={styles.image} />
      
