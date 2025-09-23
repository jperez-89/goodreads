import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

const Table = () => {
    const [isChecked, setChecked] = useState(false);
    return (
        <View className="flex-1 bg-white justify-center items-center shadow-md sm:rounded-lg">
            <View className="text-gray-500 dark:text-gray-400">
                <View className="text-xs text-gray-700 bg-gray-100 flex-row">
                    {/* <View className="px-6 py-3">
                        <Text>Chk</Text>
                    </View> */}
                    <View className="px-5 py-2">
                        <Text>Name</Text>
                    </View>
                    <View className="px-5 py-2">
                        <Text>Position</Text>
                    </View>
                    <View className="px-5 py-2">
                        <Text>Status</Text>
                    </View>
                    <View className="px-5 py-2">
                        <Text>Action</Text>
                    </View>
                </View>
                <View className="flex-row bg-white border-b  border-gray-200">
                    {/* CHK */}
                    {/* <View className="">
                        <Checkbox
                            className=''
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? '#4630EB' : undefined}
                        />
                    </View> */}

                    <View className="px-5 py-2">
                        {/* <Image className="w-7 h-7 rounded-full" source={{ uri: "https://imgs.search.brave.com/Hct5DCGPujLNrS4klFgSiaj6sNqxljli9eza5n1Fyt0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vTUFEcHV1/NjFBb2svMS90aHVt/Ym5haWxfbGFyZ2Uv/Y2FudmEteW91bmct/Z3V5LWF2YXRhci0t/LXBlcnNvbi1mbGF0/LWRlc2lnbi1pY29u/LU1BRHB1dTYxQW9r/LnBuZw" }} alt="Jese image" /> */}
                        <Text className="">Neil Sims</Text>
                    </View>

                    <View className="px-5 py-2">
                        <Text>React Developer</Text>
                    </View>

                    <View className="px-5 py-2 flex-row">
                        <View className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></View>
                        <Text>Online</Text>
                    </View>
                    <View className="px-5 py-2">
                        <Pressable className='bg-green-700 rounded-md p-1'>
                            <Text className='text-base text-white'>Edit</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Table