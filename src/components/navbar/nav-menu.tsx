import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import Menu from "antd/lib/menu";
import type { MenuItemType } from "antd/lib/menu/hooks/useItems";
import Spin from "antd/lib/spin";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { AccountCtx } from "../../api-facade/account-ctx";
import PageRoutes from "../../routing/page-routes";

const NavMenu: FC = () => {
  const { localAccount, loading } = useContext(AccountCtx);
  const router = useRouter();

  // Everyone
  const generalItems = [{ label: "Members", href: PageRoutes.allMembers }];

  // Registered Acounts
  const registeredItems = [{ label: "My Profile", href: PageRoutes.myProfile }];

  // Admins
  const adminItems = [
    { label: "Accounts", href: PageRoutes.allAccounts },
    { label: "Register", href: PageRoutes.register },
  ];

  const items: { label: string; href: string }[] = generalItems;
  if (!loading) {
    if (localAccount) for (const it of registeredItems) items.push(it);
    if (localAccount?.is_admin) for (const it of adminItems) items.push(it);
  }

  const menuItems: MenuItemType[] = items.map((it) => {
    return {
      label: (
        <Link href={it.href}>
          <a>{it.label}</a>
        </Link>
      ),
      key: it.label,
    };
  });

  if (loading) menuItems.push({ label: <Spin />, key: "loading" });

  // Highlights the right menu item when navigating by url
  function getSelectedKey() {
    const item = items.find((it) => router.pathname.startsWith(it.href));
    return item ? [item.label] : [];
  }

  return (
    <div className="nav-menu">
      <Menu
        items={menuItems}
        mode="horizontal"
        overflowedIndicator={<MenuOutlined className="collapsed-icon" />}
        style={{ fontSize: "inherit" }}
        selectedKeys={getSelectedKey()}
      />
    </div>
  );
};

export default NavMenu;
