import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import UserForm from "@/components/page/user/user-form";

const pageHeader: IPageHeader = {
  title: "유저등록",
};

const UserNewPage: IDefaultLayoutPage = () => {
  return <UserForm />;
};

UserNewPage.getLayout = getDefaultLayout;
UserNewPage.pageHeader = pageHeader;

export default UserNewPage;
