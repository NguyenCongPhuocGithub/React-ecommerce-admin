import { Button, Checkbox, Form, Input, message } from 'antd';
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import axiosClient from "../../libraries/axiosClient";
import {LOCATIONS} from '../../constants';


function LoginPage() {

  const [form] = Form.useForm();
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate();
  const token = window.localStorage.getItem('TOKEN');

  const saveCredentials = (email, password) => {
    localStorage.setItem('REMEMBERED_EMAIL', email);
    localStorage.setItem('REMEMBERED_PASSWORD', password);
  };

  const onLogin = async (values) =>{
    try {
      const url = '/auth/login';
      // values from front end
      const res = await axiosClient.post(url, values);
      // console.log('<=====value=====>', values);

      const { token, refreshToken } = res.data;
      // console.log('««««« token »»»»»', token);
      // console.log('««««« refreshToken »»»»»', refreshToken);

        window.localStorage.setItem('TOKEN', token);
        window.localStorage.setItem('REFRESH_TOKEN', refreshToken);

        if (remember) {
          const { email, password } = values;
          saveCredentials(email, password);
        }else{
          window.localStorage.removeItem('REMEMBERED_EMAIL');
          window.localStorage.removeItem('REMEMBERED_PASSWORD');
        }
        

      axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

      // token data from server gửi về front end
      if (token) {
        navigate(LOCATIONS.HOME_PAGE);
        message.success('Login is successful.');
      }


    } catch (error) {
      console.error('««««« error »»»»»', error);
      message.error('Login is failed. Please check your credentials.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (token) {
      navigate(LOCATIONS.PRODUCTS_PAGE);
    }
  }, [navigate, token]);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('REMEMBERED_EMAIL');
    const rememberedPassword = localStorage.getItem('REMEMBERED_PASSWORD');
    if (rememberedEmail && rememberedPassword) {
      form.setFieldsValue({
        email: rememberedEmail,
        password: rememberedPassword,
      });
      setRemember(true);
    }
  }, [form]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onLogin}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >

            <Input />

        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              ge: "Please input your password!",
            },
          ]}
        >

          <Input.Password />  

        </Form.Item>

        <Form.Item
          name="remember"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          >Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;