import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from 'graphql/queries'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'util/hooks'
import { AuthContext } from 'context/auth'

export default function RegisterPage() {
  const context = React.useContext(AuthContext)
  const navigate = useNavigate()

  const [errors, setErrors] = React.useState({})

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData)
      navigate('/')
    },
    onError(err) {
      // @ts-ignore
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,
  })

  function registerUser() {
    addUser()
  }
  return (
    <>
      <div className="form-container">
        <Form
          onSubmit={onSubmit}
          novalidate
          className={loading ? 'loading' : ''}
        >
          <h1>Register</h1>
          {/* react-hook-form */}
          <Form.Input
            label="Username"
            placeholder="Username..."
            name="username"
            value={values.username}
            onChange={onChange}
            type="text"
            // @ts-ignore
            error={errors.username ? true : false}
          />
          <Form.Input
            label="Email"
            placeholder="Email..."
            name="email"
            value={values.email}
            onChange={onChange}
            type="email"
            // @ts-ignore
            error={errors.email ? true : false}
          />
          <Form.Input
            label="Password"
            placeholder="Password..."
            name="password"
            value={values.password}
            onChange={onChange}
            type="password"
            // @ts-ignore
            error={errors.password ? true : false}
          />
          <Form.Input
            label="Confirm Password"
            placeholder="Confirm Password..."
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={onChange}
            type="password"
            // @ts-ignore
            error={errors.confirmPassword ? true : false}
          />
          <Button type="submit" primary>
            Register
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value: any) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
