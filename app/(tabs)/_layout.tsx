import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { setStatusBarStyle } from 'expo-status-bar';

export default function TabsLayout() {
    return (

        <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: 'red', } }} >
            <Tabs.Screen
                name="(Movies)"
                options={{
                    headerShown: false,
                    title: 'Movies',
                    tabBarIcon: ({ color }) => <MaterialIcons name="local-movies" size={24} color={color} />,
                }} />

            <Tabs.Screen name="about" options={{
                headerShown: false,
                title: 'About',
                tabBarIcon: ({ color }) => <FontAwesome name="info-circle" size={24} color={color} />,
            }} />
        </Tabs>
    )
}