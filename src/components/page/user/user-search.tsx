import { IUserSearchFormValue } from "@/client/user/user";
import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const statusOptions = [
  { label: "전체", value: "ALL" },
  { label: "가입완료", value: "COMPLETED" },
  { label: "탈퇴", value: "WITHDRAWAL" },
];

const UserSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    (formValue: IUserSearchFormValue) => {
      router.push({
        pathname: router.pathname,
        query: {
          page: router.query.page ? router.query.page : 1,
          size: router.query.size ? router.query.size : 5,
          searchDateType: formValue?.searchDateType,
          startDate: formValue.dateRange?.startDate?.format("YYYY-MM-DD")
            ? formValue.dateRange?.startDate?.format("YYYY-MM-DD")
            : "2020-01-01",
          endDate: formValue.dateRange?.endDate?.format("YYYY-MM-DD")
            ? formValue.dateRange?.endDate?.format("YYYY-MM-DD")
            : dayjs()?.format("YYYY-MM-DD"),
          status: formValue?.status,
          searchType: formValue?.searchType,
          searchText: formValue?.searchText,
        },
      });
    },
    [router]
  );

  return (
    <DefaultSearchForm form={form} onFinish={handleFinish}>
      <FormSearch>
        <FieldInline>
          <Form.Item label="기간" name="searchDateType" initialValue="created">
            <Select>
              <Select.Option value="created">등록일자</Select.Option>
              <Select.Option value="updated">수정일자</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="dateRange">
            <DateRangeField />
          </Form.Item>
        </FieldInline>
        <div>
          <Form.Item name="status" label="유저상태">
            <Radio.Group options={statusOptions} />
          </Form.Item>
        </div>
        <div>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="userName">
              <Select>
                <Select.Option value="userName">이름</Select.Option>
                <Select.Option value="email">Email</Select.Option>
                <Select.Option value="schoolName">학교명</Select.Option>
                <Select.Option value="schoolNumber">학번</Select.Option>
                <Select.Option value="majorName">전공명</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="searchText" className="grow">
              <Input placeholder="검색어를 입력해주세요" />
            </Form.Item>
          </FieldInline>
        </div>
      </FormSearch>
      <div className="flex justify-center gap-2">
        <Button htmlType="submit" className="btn-with-icon" icon={<Search />}>
          검색
        </Button>
        <Button
          htmlType="button"
          className="btn-with-icon"
          onClick={() => {
            form.resetFields();
          }}
        >
          초기화
        </Button>
      </div>
    </DefaultSearchForm>
  );
};

export default React.memo(UserSearch);
