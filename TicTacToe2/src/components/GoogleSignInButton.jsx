import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const GoogleSignInButton = () => {
  useEffect(() => {
    // Initialize Google Sign-In
    GoogleSignin.configure({
      webClientId: '1097154151652-18v73q78a3henhr1hda10nm5b7akaml4.apps.googleusercontent.com', // Replace with your web client ID from the Google Developer Console
      offlineAccess: true,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      // You can handle user registration here using the userInfo object

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign-In Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign-In In Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Not Available');
      } else {
        Alert.alert('An error occurred', error.toString());
      }
    }
  };

  return (
    <View>
      <Button
        title="Sign in with Google"
        onPress={signInWithGoogle}
      />
    </View>
  );
};

export default GoogleSignInButton;
