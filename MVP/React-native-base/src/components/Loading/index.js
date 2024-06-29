import React from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { forwardRef } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";

const { width } = Dimensions.get("screen");

// eslint-disable-next-line react/display-name
const ModalLoading = forwardRef(({}, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const show = () => {
    setIsVisible(true);
  };
  const hide = () => {
    setIsVisible(false);
  };
  const getCurrentLoadingState = () => {
    return isVisible;
  };
  useImperativeHandle(ref, () => ({
    show: show,
    hide: hide,
    getCurrentLoadingState: getCurrentLoadingState,
  }));
  return (
    <Modal isVisible={isVisible} transparent={true}>
      <View style={[styles.wrap, StyleSheet.absoluteFill]}>
        <ActivityIndicator size={'large'} />
      </View>
    </Modal>
  );
});
export default ModalLoading;
const styles = StyleSheet.create({
  loading: {
    width: width * 0.6,
  },
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});