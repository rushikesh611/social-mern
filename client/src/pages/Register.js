import React, { useState, useContext } from 'react';
import {Form,Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {useForm} from '../utils/hooks';
import {AuthContext} from '../context/auth';

function Register(props) {
    const context = useContext(AuthContext);
    const [errors,setErrors] = useState({});

    const { onChange, onSubmit, values} = useForm(registerUser,{
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });


    const [addUser,{ loading }] = useMutation(REGISTER_USER, {
        update(_,{data: {register :userData}}){
            // console.log(result);
            context.login(userData);
            props.history.push('/')
        },
        onError(err){
            // console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            // setErrors(err&&err.graphQLErrors[0]?err.graphQLErrors[0].extensions.exception.errors:{});
        },
        variables:values
    });

    function registerUser(){
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading":''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    values={values.username}
                    onChange={onChange}
                    type="text"
                    error={errors.username ? true : false}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    values={values.email}
                    onChange={onChange}
                    type="email"
                    error={errors.email ? true : false}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    values={values.password}
                    onChange={onChange}
                    type="password"
                    error={errors.password ? true : false}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    values={values.confirmPassword}
                    onChange={onChange}
                    type="password"
                    error={errors.confirmPassword ? true : false}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`;

export default Register;