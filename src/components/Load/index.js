import React from 'react';
import { View } from 'react-native';
import { 
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Portal,
} from 'react-native-paper';
import { styles } from './style';

export function Load({ hasError, tryAgainClick }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        animating={true} 
        size="large"
      />
      <Portal>
        <Dialog
          visible={hasError}
          onDismiss={tryAgainClick}
        >
          <Dialog.Title>Ops!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Ocorreu um erro ao atualizar os dados, você pode tentar novamente.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button testID="tryButton" onPress={tryAgainClick}>Tentar de novo</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}