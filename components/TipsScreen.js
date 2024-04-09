import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Animated,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook for navigation


export default function TipsScreen() {
    const navigation = useNavigation();

    // Function to handle "Learn More" button press
    const handleLearnMorePress = (url) => {
        if (!url) {
            Alert.alert("Error", "No further information available.");
            return;
        }
        openLink(url);
    };

    // Placeholder function for sending an emergency SMS
    const sendEmergencySMS = () => {
        Alert.alert("Emergency SMS Sent", "Your pre-set emergency message has been sent to your contacts.");
    };

    const safetyTips = [
        {
            id: '1',
            title: 'Earthquake Preparedness',
            description: 'Secure heavy furniture and appliances. Practice "Drop, Cover, and Hold On" drills regularly. Plan and practice evacuation routes.',
            link: 'https://example.com/earthquake-preparedness'
        },
        {
            id: '2',
            title: 'Staying Safe While Walking Alone at Night',
            description: 'Always stay alert to your surroundings. Choose well-lit, busy streets and avoid using headphones. Share your live location with a trusted contact.',
            link: 'https://example.com/walking-alone-safety'
        },
        {
            id: '3',
            title: 'Safe Transportation Choices',
            description: 'Use reputable ride-sharing services and share ride details with someone you trust. Verify the car and driver before getting in.',
            link: 'https://example.com/safe-transportation'
        },
        {
            id: '4',
            title: 'Digital Safety',
            description: 'Use strong, unique passwords for different accounts. Be cautious about the personal information you share on social media.',
            link: 'https://example.com/digital-safety'
        },
        {
            id: '5',
            title: 'Self-Defense Basics',
            description: 'Knowing basic self-defense techniques can empower you to protect yourself in dangerous situations. Consider enrolling in a self-defense class.',
            // link: 'https://example.com/self-defense-basics'
        },
        {
            id: '6',
            title: 'Using Safety Apps and Devices',
            description: 'Get familiar with safety apps that allow you to send SOS alerts with your location. Consider carrying a personal alarm device.',
            // link: 'https://example.com/safety-apps-and-devices'
        },
        {
            id: '7',
            title: 'Creating a Safety Plan',
            description: 'Have a plan for different emergency situations. Include a list of emergency contacts and familiarize yourself with the nearest exits in buildings.',
            link: 'https://example.com/creating-a-safety-plan'
        },
        {
            id: '8',
            title: 'Spotting and Avoiding Scams',
            description: 'Be wary of unsolicited communications asking for personal information or money. Verify the authenticity of requests through official channels.',
            link: 'https://example.com/avoiding-scams'
        },
        {
            id: '9',
            title: 'Fire Safety in the Home',
            description: 'Install smoke alarms in every sleeping room and outside each separate sleeping area. Test them monthly and replace batteries annually.',
            link: 'https://example.com/fire-safety-home'
        },
        {
            id: '10',
            title: 'Handling Aggressive Animals',
            description: 'Do not approach or attempt to feed wild animals. If you encounter an aggressive animal, remain calm, avoid eye contact, and slowly back away.',
            link: 'https://example.com/aggressive-animals'
        }
        // Add more tips as needed...
    ];


    const openLink = (url) => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                navigation.navigate('ComingSoon');
            } else {
                Alert.alert("Error", "Unable to open link.");
            }
        });
    };


    return (
        <ImageBackground source={require('./../assets/bg.png')} style={styles.backgroundImage}>
            <View style={styles.overlay}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image source={require('./../assets/logo.png')} style={styles.profilePic} />


                    {/* Dynamically rendered Safety Tips section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Safety Tips</Text>
                        {safetyTips.map((tip) => (
                            <View key={tip.id} style={styles.tipContainer}>
                                <Text style={styles.tipTitle}>{tip.title}</Text>
                                <Text style={styles.tipDescription}>{tip.description}</Text>
                                <TouchableOpacity onPress={() => handleLearnMorePress(tip.link)} style={styles.learnMoreBtn}>
                                    <Text style={styles.learnMoreText}>Learn More</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>


                    {/* Emergency SMS section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Emergency SMS</Text>
                        <Text style={styles.sectionContent}>
                            In an emergency, quickly send a pre-set message to your emergency contacts with your location.
                        </Text>
                        <TouchableOpacity style={styles.Button} onPress={sendEmergencySMS}>
                            <Text style={styles.ButtonText}>Send Emergency SMS</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}



const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust opacity as needed

    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity as needed
    },
    scrollViewContent: {
        paddingVertical: 20,
        margin: 7,
    },
    //   cardContainer: {
    //     alignItems: 'center',
    //     marginBottom: 20,
    //   },
    //   flipCard: {
    //     width: 300,
    //     height: 200,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backfaceVisibility: 'hidden',
    //     marginBottom: 15,
    //   },
    //   flipCardBack: {
    //     position: 'absolute',
    //     top: 0,
    //   },
    //   flipText: {
    //     fontSize: 20,
    //     color: '#fff',
    //   },
    sectionTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
        color: '#265073',
    },
    tipContainer: {
        backgroundColor: 'rgba(38, 80, 115 ,0.6)',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F1FADA',
    },
    tipDescription: {
        fontSize: 16,
        marginTop: 5,
        color: '#F1FADA',
    },
    link: {
        marginTop: 5,
        color: 'blue',
        color: '#9AD0C2',
    },
    Button: {
        backgroundColor: '#FA8072', // Salmon color
        borderRadius: 20, // Rounded corners
        paddingVertical: 10, // Vertical padding
        paddingHorizontal: 20, // Horizontal padding
        alignItems: 'center',
        justifyContent: 'center', // Center the text inside the button
        marginTop: 20,
        shadowColor: '#000', // Shadow to give depth, works on iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Elevation for Android to give shadow effect
    },
    ButtonText: {
        color: '#fff', // White text color
        fontSize: 18,
        fontWeight: 'bold', // Bold font weight
    },

    profilePic: {

        width: 400, // Adjust width as needed
        height: 80, // Adjust height as needed
        alignSelf: 'center', // Centers the image
        marginTop: 40,
    },
});
