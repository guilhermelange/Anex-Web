import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, SimpleGrid, Stack, Text, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/context/AuthContext";
import { useColorModeValue } from "@chakra-ui/react";

export function SignInForm() {
    const [show, setShow] = useState(false);
    const { signIn } = useContext(AuthContext);

    const primary = useColorModeValue("purple", "orange")
    const text = useColorModeValue("black", "white")

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (data: any) => {
        await signIn(data);
    };

    return (
        <VStack
            w={'full'}
            h={'full'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <VStack
                pb={4}
                spacing={6}
                align="center">
                <Heading>Entre na <Text display={'inline'} color={primary}>AnEx</Text></Heading>
            </VStack>
            <form style={{ width: '100%', 'display': 'flex', 'justifyContent': 'center' }} onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={1} columnGap={3} rowGap={4} w={'70%'}>
                    <FormControl isInvalid={!!errors.email}>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <Input
                            id='email'
                            placeholder='exemplo@dominio.com'
                            {...register('email', {
                                required: 'Obrigatório informar um email',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email inválido"
                                }
                            })}
                        />
                        <FormErrorMessage>
                            {errors.email && String(errors.email.message)}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
                        <FormLabel htmlFor='password'>Senha</FormLabel>
                        <InputGroup>
                            <Input
                                id='password'
                                placeholder='*******'
                                {...register('password', {
                                    required: 'Obrigatório informar uma senha',
                                })}
                                type={show ? 'text' : 'password'}
                            />
                            <InputRightElement onClick={() => setShow(!show)}>
                                {show ? <ViewOffIcon></ViewOffIcon> : <ViewIcon></ViewIcon>}
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.password && String(errors.password.message)}
                        </FormErrorMessage>
                    </FormControl>
                    <Button isLoading={isSubmitting} type='submit'>
                        Login
                    </Button>
                </SimpleGrid>
            </form>
        </VStack>
    )
}