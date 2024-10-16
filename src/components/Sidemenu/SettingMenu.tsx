import React from "react";
import "./style.css";
import Link from "next/link";

const Menu = [
  {
    group: "Access",
    menuItems: [
      { label: "VPN", path: "/settings/vpn" },
      { label: "Public Keys", path: "/settings/keys" },
    ],
  },
];
const SettingsMenu = () => {
  return (
    <div className="side-menu">
      Setting Menu
      {Menu.sort((a, b) => a.group.localeCompare(b.group)).map((group) => (
        <div key={group.group}>
          <p>{group.group}</p>{" "}
          <div className="pl-2 flex flex-col" key={group.group}>
            {group.menuItems
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((menuItem) => (
                <Link href={menuItem.path} key={menuItem.label}>
                  {menuItem.label}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsMenu;
