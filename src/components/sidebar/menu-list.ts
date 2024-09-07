import {
    Users,
    LayoutGrid,
    LucideIcon,
    Table,
    FileText,
    CircleHelp,
    MailQuestion,
    BadgePoundSterling,
    House
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
    disabled?: boolean;
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string, signedIn: boolean): Group[] {
    const helpSection = {
        groupLabel: "Help",
        menus: [
            {
                href: "/faq",
                label: "FAQ",
                active: pathname.includes("/faq"),
                icon: CircleHelp,
                submenus: [],
            },
            {
                href: "/contact",
                label: "Contact",
                active: pathname.includes("/contact"),
                icon: MailQuestion,
                submenus: [],
            }
        ]
    };

    if (!signedIn) {
        return [
            {
                groupLabel: "",
                menus: [
                    {
                        href: "/",
                        label: "Home",
                        active: pathname === "/",
                        icon: House,
                        submenus: [],
                        disabled: signedIn
                    },
                    {
                        href: "/pricing",
                        label: "Pricing",
                        active: pathname.includes("/pricing"),
                        icon: BadgePoundSterling,
                        submenus: [],
                    }
                ]
            },
            helpSection
        ];
    }

    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutGrid,
                    submenus: [],
                    disabled: !signedIn
                }
            ]
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "/table",
                    label: "Tables",
                    active: pathname.includes("/table"),
                    icon: Table,
                    submenus: [],
                    disabled: !signedIn
                    // submenus: [
                    //   {
                    //     href: "/posts",
                    //     label: "All Posts",
                    //     active: pathname === "/posts"
                    //   },
                    //   {
                    //     href: "/posts/new",
                    //     label: "New Post",
                    //     active: pathname === "/posts/new"
                    //   }
                    // ]
                },
                {
                    href: "/document",
                    label: "Documents",
                    active: pathname.includes("/document"),
                    icon: FileText,
                    submenus: [],
                    disabled: !signedIn
                }
            ]
        },
        {
            groupLabel: "Organizations",
            menus: [
                {
                    href: "/organization",
                    label: "Manage",
                    active: pathname.includes("/organization"),
                    icon: Users,
                    submenus: [],
                    disabled: !signedIn
                },
            ]
        },
        helpSection
    ];
}
