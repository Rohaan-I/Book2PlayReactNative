import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class FacilityDetailsScreen extends React.Component {

    render() {
        const { navigation } = this.props;
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Image
                style={{resizeMode:'contain', width: 300, height: 150}}
                source={require('../assets/images/logo_field.png')}
                />
                <Text style={styles.firstHeading}>
                    {navigation.getParam('field').address.streetAddress}
                </Text>
                <Text>
                    {navigation.getParam('field').address.poBox},{navigation.getParam('field').address.city.city}
                </Text>
                <Text>
                    {navigation.getParam('field').address.country.country}
                </Text>
                <Text style={styles.heading}>
                    Sport
                </Text>
                <Text>
                    {navigation.getParam('field').sport.name}
                </Text>
                <Text style={styles.heading}>
                    Facilities
                </Text>
                <View style={styles.chipsContainer}>
                    {navigation.getParam('field').facilities.map(fac => 
                        <Text 
                            key={fac._id} 
                            style={styles.chip}>
                            
                            {fac.id.name}
                        </Text>
                    )}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flex: 1, 
        alignItems: 'flex-start'
    },
    screenLoading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    firstHeading: {
        marginTop: 10,
        fontSize: 16, 
        color: '#052c52', 
        fontWeight: 'bold'
    },
    heading: {
        marginTop: 10, 
        fontSize: 16, 
        color: '#052c52', 
        fontWeight: 'bold'
    },
    chipsContainer: {
        marginBottom: 10, 
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    chip: {
        marginTop: 5, 
        marginRight: 5, 
        borderRadius: 40, 
        backgroundColor: '#dedede', 
        padding: 8,
        height: 37
    }
});