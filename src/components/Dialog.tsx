import { useColorModeValue } from "@chakra-ui/react";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react";
import React, { useRef } from "react";

export interface DialogRequestDTO {
    title: string;
    message: string;
    button: string;
    isOpen: any;
    onOpen: any;
    onClose: any;
}


export default function Dialog({ title, message, button, isOpen, onOpen, onClose }: DialogRequestDTO) {
    const cancelRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const primary = useColorModeValue("purple", "orange")
    const text = useColorModeValue("black", "white")

    return (
        <AlertDialog
            // motionPreset='slideInBottom'
            // leastDestructiveRef={undefined}
            leastDestructiveRef={cancelRef}
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