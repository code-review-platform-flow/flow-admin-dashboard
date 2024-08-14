import { IUserFormValue, certificationUser, createUser, sendEmailUser } from "@/client/user/user";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Button, Divider, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";

interface IUserFormProps {
  userId?: string;
  initialValues?: IUserFormValue;
}

const UserForm = ({ userId, initialValues }: IUserFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSendEmail = async () => {
    try {
      setIsLoading(true);
      const values = form.getFieldsValue(["email", "schoolName"]);
      const formattedValues = {
        email: values.email,
        universityName: values.schoolName,
      };
      await sendEmailUser(formattedValues);
      messageApi.success("발송되었습니다");
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleCertification = async () => {
    try {
      setIsLoading(true);
      const values = form.getFieldsValue(["email", "schoolName", "code"]);
      const formattedValues = {
        email: values.email,
        universityName: values.schoolName,
        code: values.code,
      };
      await certificationUser(formattedValues);
      messageApi.success("인증되었습니다");
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleFinish = async (formValue: IUserFormValue) => {
    try {
      setIsLoading(true);

      await createUser(formValue);
      messageApi.success("생성되었습니다");
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <>
      {contextHolder}
      <DefaultForm<IUserFormValue> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="유저 기본 정보를 입력해주세요">
          <FormGroup title="유저명*">
            <Form.Item name="userName" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="유저명을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="이메일*">
            <Form.Item name="email" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="이메일을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="비밀번호*">
            <Form.Item name="password" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="비밀번호를 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="학교명*">
            <Form.Item name="schoolName" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="학교명을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="전공명*">
            <Form.Item name="majorName" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="전공명을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="학번*">
            <Form.Item name="studentNumber" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="학번을 입력하세요" />
            </Form.Item>
            <Button loading={isLoading} onClick={() => handleSendEmail()}>
              인증번호 발송
            </Button>
          </FormGroup>

          <Divider />

          <FormGroup title="인증코드*">
            <Form.Item name="code" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="인증코드를 입력하세요" />
            </Form.Item>
            <Button loading={isLoading} onClick={() => handleCertification()}>
              인증코드 확인하기
            </Button>
          </FormGroup>
        </FormSection>

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(UserForm);
