import React, { useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ImageStore
} from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Home = ({ navigation }) => {

    // Dummy Datas
    const initialCurrentLocation = {
        streetName: "Ruby's Real Juice",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }

    const [juices, setJuices] = React.useState('')
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

    const fetchJuices = async () => {
        fetch("https://parseapi.back4app.com/classes/Juice", {
            "method": "GET",
            "headers": {
                "X-Parse-Application-Id": "s7lWyMcG1FCEWjBWxEVa9Dty0aND7ZapvV8s0drp",
                "X-Parse-Master-Key": "Y7JcMzzn10aeSmtAtNurWVQ97c1r8cq3DwFwAvx2",
                "X-Parse-Session-Token": "r:92aa1de075bef26588d16dff644c637b"
            }
        })
            .then(response => response.json())
            .then(response => {
                return (response['results'])
            })
            .then(response => {
                setJuices(response)
                console.log(response)
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchJuices()
    }, [])

    function renderHeader() {
        return (
            //This is the container for the top icons/buttons and header 
            //Note the Touch View Touch, 
            <View style={stylesHeader.headerS}>
                <TouchableOpacity
                    style={stylesHeader.iconStyle}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderJuiceList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Juice", {
                    item,
                    currentLocation
                })}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={images[item.photo]}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>{'$' + item.price}</Text>
                    </View>
                </View>

                {/* Juice Info */}
                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={juices}
                keyExtractor={item => `${item.objectId}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {/* {renderMainCategories()} */}
            {renderJuiceList()}
        </SafeAreaView>
    )
}

const stylesHeader = StyleSheet.create({
    headerS: {
        flexDirection: 'row',
        height: 50
    },
    iconStyle: {
        width: 50,
        paddingLeft: SIZES.padding * 2,
        justifyContent: 'center'
    },

})

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Home