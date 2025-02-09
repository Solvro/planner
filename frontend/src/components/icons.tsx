import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  AlertTriangle,
  BellRingIcon,
  Biohazard,
  Bug,
  CalendarPlusIcon,
  CalendarRangeIcon,
  Check,
  CircleHelp,
  Cloud,
  Copy,
  Download,
  DownloadCloud,
  EllipsisVertical,
  Fingerprint,
  GitPullRequestClosed,
  Github,
  Link,
  Loader2Icon,
  Lock,
  LogOut,
  Menu,
  Moon,
  Paintbrush,
  Palette,
  Pencil,
  Plus,
  RefreshCw,
  RefreshCwOff,
  Settings2Icon,
  Share,
  Star,
  StarHalf,
  Sun,
  Timer,
  Trash,
  TriangleAlert,
  UploadCloud,
  UserIcon,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import LogoColor from "../../public/assets/logo/logo_solvro_color.png";
import LogoWhite from "../../public/assets/logo/logo_solvro_mono.png";

export const Icons = {
  Logo: () => (
    <>
      <Image
        src={LogoColor}
        alt="Logo Koła Naukowego Solvro"
        width={50}
        className="block dark:hidden"
      />
      <Image
        src={LogoWhite}
        alt="Logo Koła Naukowego Solvro"
        width={50}
        className="hidden dark:block"
      />
    </>
  ),
  Loader: Loader2Icon,
  Plans: CalendarRangeIcon,
  Fingerprint,
  Alert: TriangleAlert,
  Lock,
  Timer,
  Biohazard,
  Download,
  Palette,
  User: UserIcon,
  Bell: BellRingIcon,
  AddCalendar: CalendarPlusIcon,
  Share,
  Link,
  Copy,
  Workflow,
  Paintbrush,
  Plus,
  DownloadCloud,
  UploadCloud,
  Cloud,
  AlertTriangle,
  RefreshCw,
  GitPullRequestClosed,
  RefreshCwOff,
  Star,
  StarFilledIcon,
  StarHalf,
  UsersRound,
  X,
  EllipsisVertical,
  Trash,
  Pencil,
  Sun,
  Moon,
  Settings: Settings2Icon,
  CircleHelp,
  LogOut,
  Check,
  Bug,
  Menu,
  Github,
  FlexyArrow: ({ className }: { className?: string }) => (
    <svg
      width="91"
      height="195"
      viewBox="0 0 91 195"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "size-20 text-blue-600 transition-transform duration-300",
        className,
      )}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M83.8275 2.83924C71.2259 10.0664 63.6462 14.9471 55.0809 21.3765C41.8223 31.3725 31.6613 40.3126 29.0565 44.3251C27.6954 46.4604 27.32 47.7744 27.4373 50.074C27.5546 52.4439 28.2821 53.9222 30.2533 55.729C33.8671 59.061 40.4143 61.2901 54.4943 63.9417C58.9764 64.7864 60.9476 65.42 60.9476 65.9831C60.9476 66.5463 58.6948 69.3151 56.6767 71.2392C54.0719 73.75 51.1855 76.0261 45.6239 79.9916C37.6687 85.6466 34.313 88.5797 31.3797 92.4984C29.2442 95.2907 28.2352 97.5433 28.1413 99.6551C28.0005 102.377 28.7983 104.067 30.8869 105.381C33.1397 106.812 34.2895 107 42.761 107.328C52.6873 107.704 53.0628 107.844 51.115 110.543C50.6223 111.247 47.9471 113.992 45.178 116.667C40.2501 121.407 38.0677 123.777 35.6037 127.062C33.7263 129.573 29.9248 135.439 26.5221 141.024C18.4027 154.399 16.5957 158.575 12.2309 173.804C11.48 176.432 10.7995 178.567 10.7056 178.567C10.424 178.567 10.0486 177.324 9.79044 175.447C9.3915 172.725 7.98349 167.375 7.30295 165.967C6.62242 164.535 5.87149 163.878 4.6043 163.55C2.72697 163.034 0.708845 164.23 0.145647 166.154C-0.112485 166.952 -0.0420511 167.75 0.474214 171.364C0.826212 173.71 1.20167 176.948 1.34247 178.567C1.92913 186.146 2.0934 187.648 2.39846 189.244C2.77393 191.285 3.36058 192.482 4.44004 193.514C6.05924 195.063 8.28857 195.415 10.3771 194.43C11.0342 194.148 12.536 192.975 13.7563 191.848C16.8773 188.986 20.3035 186.452 34.4303 176.573C43.066 170.542 45.9055 168.477 46.3983 167.914C46.7268 167.492 46.5156 167.07 46.0228 167.07C45.53 167.07 33.5386 171.786 29.6197 173.522C27.9301 174.273 25.0906 175.611 23.2837 176.549C21.4768 177.465 19.928 178.239 19.8341 178.286C19.7403 178.333 19.7637 178.075 19.8576 177.699C24.5509 162.94 26.0293 159.608 33.6324 146.726C41.8223 132.858 43.9812 129.807 50.7396 122.721C55.034 118.192 56.9348 115.775 58.1081 113.359C58.8121 111.857 58.9529 111.294 59.0233 109.534C59.1172 107.586 59.0937 107.375 58.3897 105.944C57.1694 103.456 54.9636 101.931 51.6314 101.251C50.7631 101.086 48.041 100.805 45.577 100.664C41.0949 100.406 37.2463 100.054 36.4954 99.8194C35.9557 99.6551 36.1669 99.2562 38.0677 96.7924C40.4613 93.7185 43.1364 91.3251 50.0356 86.1159C55.2687 82.1738 58.0612 79.8273 60.666 77.1993C67.0489 70.7465 68.9497 65.6546 66.2041 62.4399C64.5379 60.5158 62.778 59.8353 55.1983 58.2866C43.77 55.9636 37.7391 53.8753 34.9701 51.3176C33.304 49.7924 33.6325 48.713 36.7535 45.4044C44.6852 37.004 59.9855 24.4504 75.6142 13.4923C85.6814 6.42936 89.4595 3.47279 90.14 1.99451C90.5155 1.22017 90.5154 1.10285 90.1869 0.563162C89.9522 0.234654 89.5768 0 89.2717 0C88.9901 0 86.5496 1.29056 83.8275 2.83924Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
};
