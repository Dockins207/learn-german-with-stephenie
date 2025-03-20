import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Button, Card, Form, Input, message, Spin, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type ProfileFormData = {
  first_name: string;
  last_name: string;
  email: string;
};

const ProfilePage = () => {
  const [form] = Form.useForm<ProfileFormData>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const { student, token, logout } = useAuth();

  useEffect(() => {
    if (!student) {
      router.push('/auth/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        form.setFieldsValue({
          first_name: data.student.first_name,
          last_name: data.student.last_name,
          email: data.student.email,
        });
      } catch (error: any) {
        message.error(error.message || 'Failed to fetch profile');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, [student, token, router, form]);

  const handleSubmit = async (values: ProfileFormData) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      message.success('Profile updated successfully');
      form.setFieldsValue({
        first_name: data.student.first_name,
        last_name: data.student.last_name,
        email: data.student.email,
      });
    } catch (error: any) {
      message.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (initialLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Title level={2}>Student Profile</Title>
            <Text type="secondary">Update your personal information</Text>
          </div>

          <Card className="shadow-sm">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="space-y-4"
            >
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter your email' }]}
              >
                <Input disabled prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Update Profile
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-4 text-center">
              <Button
                type="link"
                onClick={handleLogout}
                danger
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
