import { Dimensions, StyleSheet, ImageBackground } from 'react-native';

import React from 'react';
import {
  Section,
  SectionContent,
  Button,
  Text,
  themeColor,
} from 'react-native-rapi-ui';
import { View } from '../../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProductStore } from '../../store/product/productStore';
import { useCartAppContext } from '../../context/cart/cart-context';
import { addCartItem } from '../../context/cart/cart-funtions';
import { IcartDataType } from '../../context/cart/cart-state';
const { width } = Dimensions.get('screen');

const image = { uri: 'https://via.placeholder.com/300/09f/fff.png' };

type Item = {
  id: string;
  name: string;
  description: string;
  img: string;
  category: string;
  price: number;
  amount: number;
  available: boolean;
};

export default function ProductCard(item: IcartDataType) {
  const addToCart = useProductStore((state) => state.addToCart);

  const {
    cartState: { cartData },
    cartDispatch,
  } = useCartAppContext();

  const handleAddToCart = () => {
    let cartItem = {
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      img: item.img,
      price: item.price,
      quantity: 1,
      available: true,
      inCart: true,
    };

    addCartItem(cartDispatch, cartItem);
  };
  return (
    <>
      <SectionContent style={styles.slider}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} size='md'>
            {item.name}
          </Text>

          <Text style={styles.title} size='lg'>
            ksh.{item.price}
          </Text>
        </View>

        <ImageBackground
          source={JSON.parse(item.img)}
          resizeMode='cover'
          style={styles.image}
        />

        <Section style={styles.button}>
          <Button
            text='Add to Cart'
            leftContent={
              <MaterialCommunityIcons
                name='cart-plus'
                size={15}
                color='white'
              />
            }
            status='primary'
            type='TouchableOpacity'
            size='md'
            onPress={() => handleAddToCart()}
          />
        </Section>
      </SectionContent>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: themeColor.white,
  },

  productHeader: {
    flex: 1,
    width: width,
    backgroundColor: themeColor.white,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingLeft: 80,
  },

  slider: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 20,
    marginHorizontal: 10,
    width: 200,
    height: 200,
    flex: 0.5,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  titleContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginVertical: 4,
    backgroundColor: themeColor.primary,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  price: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  button: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    paddingTop: 4,
  },
});
