import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { fetchContact,fetchRandomContact,fetchUserContact } from '../utility/api';
import ContactThumbnail from '../component/ContactThumbnail';
import { useDispatch, useSelector } from 'react-redux';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const [contacts, setContacts] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(false);

  useEffect(() => {
    // Sử dụng useEffect để gọi fetchContacts khi thành phần được kết nối.
    setLoading(true); // Bắt đầu loading khi bắt đầu fetch dữ liệu.
    setError(false); // Reset trạng thái lỗi.

    fetchContact()
      .then((contacts) => {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, []); // Truyền một mảng rỗng để đảm bảo fetch chỉ được gọi một lần khi thành phần được kết nối.

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  const favorites = contacts.filter((contact) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});

export default Favorites;
