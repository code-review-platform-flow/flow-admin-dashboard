import { IUser, useUsers } from "@/client/user/user";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { ISO8601DateTime } from "@/types/common";
import { Alert, Button, MenuProps, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";

const UserList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();

  const { data, error, isLoading } = useUsers({
    page: router.query.page ? Number(router.query.page) : 1,
    size: router.query.size ? Number(router.query.size) : 5,
    searchDateType: router.query.searchDateType as string,
    startDate: router.query.startDate as string,
    endDate: router.query.endDate as string,
    status: router.query.status as string,
    searchType: router.query.searchType as string,
    searchText: router.query.searchText as string,
  });

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      });
    },
    [router]
  );

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const modifyDropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "statusUpdate",
        label: <a onClick={() => console.log(selectedRowKeys)}>상태수정</a>,
      },
    ],
    [selectedRowKeys]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IUser> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IUser) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/user/edit/${record.userId}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="유저를 삭제하시겠습니까?"
              onConfirm={() => alert("삭제")}
              okText="예"
              cancelText="아니오"
            >
              <a className="px-2 py-1 text-sm btn">삭제</a>
            </Popconfirm>
          </span>
        );
      },
    },
    {
      title: "유저번호",
      dataIndex: "userId",
      align: "center",
      width: 100,
    },
    {
      title: "유저명",
      dataIndex: "userName",
      align: "center",
      width: 80,
    },
    {
      title: "email",
      dataIndex: "email",
      align: "center",
      width: 140,
    },
    {
      title: "학교명",
      dataIndex: "schoolName",
      align: "center",
      width: 100,
    },
    {
      title: "학번",
      dataIndex: "schoolNumber",
      align: "center",
      width: 100,
    },
    {
      title: "전공명",
      dataIndex: "majorName",
      align: "center",
      width: 100,
    },
    {
      title: "유저상태",
      dataIndex: "status",
      align: "center",
      width: 100,
      render: (value) => {
        return <div>{value ? "가입중" : "탈퇴"}</div>;
      },
    },
    {
      title: "생성일시",
      dataIndex: "createDate",
      align: "center",
      width: 120,
      render: (value: ISO8601DateTime) => {
        if (!value) {
          return <div className="text-sm">&nbsp;</div>; // 빈칸
        }
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("hh:mm")}</span>
          </div>
        );
      },
    },
    {
      title: "수정일시",
      dataIndex: "modifyDate",
      align: "center",
      width: 120,
      render: (value: ISO8601DateTime) => {
        if (!value) {
          return <div className="text-sm">&nbsp;</div>; // 빈칸
        }
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("hh:mm")}</span>
          </div>
        );
      },
    },
  ];

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" />;
  }

  return (
    <>
      <DefaultTableBtn className="justify-end">
        <div className="flex-item-list">
          <Button type="primary" onClick={() => router.push("/user/new")}>
            유저등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<IUser>
        columns={columns}
        dataSource={data?.items || []}
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: data?.page.pageSize,
          total: data?.page.totalCount || 0,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={data?.page.totalCount}
      />
    </>
  );
};

export default React.memo(UserList);
