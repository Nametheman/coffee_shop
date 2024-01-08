import {
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GradientBgIcon from './GradientBgIcon';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';

interface ImageBackgroundProps {
  enableBackHanlder: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourtite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  BackHandler?: any;
  ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundProps> = ({
  enableBackHanlder,
  imagelink_portrait,
  type,
  id,
  favourtite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  BackHandler,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ItemBackgroundImage}>
        {enableBackHanlder ? (
          <View style={styles.BackButtonContainer}>
            <TouchableOpacity>
              <GradientBgIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <GradientBgIcon
                name="like"
                color={
                  favourtite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.WithoutBackButtonContainer}>
            <TouchableOpacity>
              <GradientBgIcon
                name="like"
                color={
                  favourtite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  ItemBackgroundImage: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  BackButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.space_30,
    alignItems: 'center',
  },
  WithoutBackButtonContainer: {},
});
