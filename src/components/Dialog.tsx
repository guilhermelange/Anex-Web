import { useColorModeValue } from "@chakra-ui/react";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

export interface DialogRequestDTO {
    title: string;
    message: string;
    button: string;
    isOpen: any;
    onOpen: any;
    onClose: any;
}


export default function Dialog({ title, message, button, isOpen, onOpen, onClose }: DialogRequestDTO) {

    const primary = useColorModeValue("purple", "orange")
    const text = useColorModeValue("black", "white")

    return (
        <AlertDialog
            // motionPreset='slideInBottom'
            leastDestructiveRef={undefined}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>{title}</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {message}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button colorScheme={primary} ml={3} onClick={onClose}>
                        {button}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}