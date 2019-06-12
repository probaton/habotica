import React from "react";
import { Image, StyleSheet } from "react-native";

export default class WardrobeIcon extends React.Component {
    render() {
        return (
            <Image
                source={require("./Wardrobe.png")}
                resizeMode="contain"
                resizeMethod="scale"
                style={styles.image}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 160,
        width: 160,
    },
});
