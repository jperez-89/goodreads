import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Text } from '@/components/ui/text';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function DropdownMenuPreview() {
    const insets = useSafeAreaInsets();
    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 4,
        right: 4,
    };

    return (
        <View id="dropdownAction" className="flex-1 bg-white items-center justify-center ">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='bg-sky-300'>
                        <Text>Open</Text>
                    </Button>
                    {/* <TouchableOpacity className='bg-black'>
                        <Text className='text-sky-300'>Open</Text>
                    </TouchableOpacity> */}
                </DropdownMenuTrigger>
                <DropdownMenuContent insets={contentInsets} sideOffset={2} className="w-56 pt-10 mt-10" align="center">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Text>Profile</Text>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Text>Billing</Text>
                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Text>Settings</Text>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Text>Keyboard shortcuts</Text>
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Text>Team</Text>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Text>Invite users</Text>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Text>Email</Text>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Text>Message</Text>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Text>More...</Text>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                            <Text>New Team</Text>
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Text>GitHub</Text>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Text>Support</Text>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                        <Text>API</Text>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Text>Log out</Text>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </View>
    );
}