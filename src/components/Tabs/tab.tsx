import cn from 'classnames';
import Link from 'next/link';

export interface TabProps {
  href: string;
  label: string;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({ href, label, className }) => {
  return (
    <li className="mr-6 select-none text-3xl ease-in-out">
      <Link href={href}>
        <a
          className={
            (cn('border-none text-slate-600 hover:text-slate-700'), className)
          }
        >
          {label}
        </a>
      </Link>
    </li>
  );
};
