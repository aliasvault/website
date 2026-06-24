import Image from "next/image";
import { Link } from "@/i18n/navigation";

interface RelatedPostProps {
  title: string;
  image: string;
  slug: string;
  date: string;
}

const RelatedPost = ({ title, image, slug, date }: RelatedPostProps) => {
  return (
    <div className="flex items-center">
      <div className="mr-5 w-[100px] overflow-hidden rounded">
        <div className="relative aspect-[100/70] w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="100px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="w-full">
        <h4>
          <Link
            href={slug}
            className="mb-1 text-base font-medium leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary"
          >
            {title}
          </Link>
        </h4>
        <p className="text-xs text-body-color">{date}</p>
      </div>
    </div>
  );
};

export default RelatedPost;
