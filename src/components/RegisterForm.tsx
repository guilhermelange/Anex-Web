import { useForm } from 'react-hook-form'
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    SimpleGrid,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';

export function RegisterForm() {
    const [show, setShow] = useState(false);
    const router = useRouter();
    const MotionVStack = motion(VStack)
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()
    const toast = useToast()

    const primary = useColorModeValue("purple", "orange")
    const text = useColorModeValue("black", "white")


    const onSubmit = async (data: any) => {
        await new Promise(r => setTimeout(r, 3000));
        toast({
            title: 'Conta criada',
            description: 'Logue com sua nova conta',
            status: 'success',
            duration: 3000,
            isClosable: true
        })
        await new Promise(r => setTimeout(r, 1000));
        router.push('/signin');
    };

    return (
        <MotionVStack
            w={'full'}
            h={'full'}
            justifyContent={'center'}
            alignItems={'center'}
            animate={{ opacity: [0, 1] }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            <VStack
                pb={4}
                spacing={6}
                align="center">
                <Heading>Crie uma conta<Text display={'inline'} color={primary}>!</Text></Heading>
            </VStack>
            <form style={{ width: '100%', 'display': 'flex', 'justifyContent': 'center' }} onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={1} columnGap={3} rowGap={4} w={'70%'}>
                    <FormControl isInvalid={!!errors.name}>
                        <FormLabel htmlFor='name'>Nome</FormLabel>
                        <Input
                            id='name'
                            placeholder='Seu nome'
                            {...register('name', {
                                required: 'Obrigatório informar um nome',
                                minLength: { value: 2, message: 'O tamanho mínimo é de 2 caracteres' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.name && String(errors.name.message)}
                        </FormErrorMessage>
                    </FormControl>
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
                        Cadastrar
                    </Button>
                </SimpleGrid>
            </form>
        </MotionVStack>
    )
}