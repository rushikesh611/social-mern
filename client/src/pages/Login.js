import React, { useState } from 'react';
import {Form,Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {useForm} from '../utils/hooks';


function Login(props) {
    const [errors,setErrors] = useState({});

    const { onChange, onSubmit, values} = useForm(loginUserCallback,{
        username:'',
        password:''
    });


    const [loginUser,{ loading }] = useMutation(LOGIN_USER, {
        update(_,result){
            // console.log(result);
            props.history.push('/')
        },
        onError(err){
            // console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables:values
    });

    function loginUserCallback(){
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading":''}>
                <h1>Login</h1>
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
                    label="Password"
                    placeholder="Password"
                    name="password"
                    values={values.password}
                    onChange={onChange}
                    type="password"
                    error={errors.password ? true : false}
                />
                <Button type="submit" primary>
                    Login
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
        ){
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`;

export default Login;