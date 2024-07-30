import Link from "next/link";
import { LinkListType } from ".";

export function LinkList({ list }: { list: LinkListType }) {
  return (
    <div className="space-y-2 md:space-y-3">
      <span className="font-bold text-lg md:text-base">{list.title}</span>
      <ul className="space-y-1 md:space-y-2">
        {list.links.map((link, index) => (
          <li key={index} className="text-lg md:text-base">
            {link.external ? (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                {link.title}
              </a>
            ) : (
              <Link
                href={link.url}
                className="hover:underline hover:underline-offset-4"
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
