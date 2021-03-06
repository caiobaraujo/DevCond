import React, { useState, useEffect } from 'react';
import C from './style';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../../contexts/StateContext';

import WallItem from '../../components/WallItem';

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, setLoading] = useState(true);
  const [wallList, setWallList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Mural de Avisos',
    });
    getWall();
  }, []);

  const getWall = async () => {
    setWallList([]);
    setLoading(true);
    const result = await api.getWall();
    setLoading(false);
    if (result.error === '') {
      setWallList(result.list);
    } else {
      alert(result.error);
    }
  };

  return (
    <C.Container>
      {!loading && wallList.length === 0 && (
        <C.NoListArea>
          <C.NoListText>Não há nenhum aviso no mural</C.NoListText>
        </C.NoListArea>
      )}
      <C.List
        data={wallList}
        onRefresh={getWall}
        refreshing={loading}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <WallItem data={item} />}
      ></C.List>
    </C.Container>
  );
};
