import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { updateLocalData } from './src/services/data';
import { Load } from './src/components/Load';
import TabNavigator from './src/routes/TabNavigator';

export default function App() {
  const [updated, setUpdated] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    handleData();
  }, []);

  async function handleData() {
    setHasError(false);
    updateLocalData(function() {
      setUpdated(true);
    }, function() {
      setHasError(false);
    });
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        {updated
          ? <TabNavigator />
          : <Load tryAgainClick={() => handleData()} hasError={hasError}/>
        }
      </PaperProvider>
    </NavigationContainer>
  );
}
