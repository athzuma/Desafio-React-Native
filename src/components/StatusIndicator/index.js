import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Caption } from 'react-native-paper';
import { styles } from './style';

export function StatusIndicator({ message, loading }) {
  return (
    <View style={styles.container}>
      {loading
        ? <ActivityIndicator testID="activityIndicator" animating={true} />
        : <Caption testID="caption">{message}</Caption>
      }
    </View>
  );
}