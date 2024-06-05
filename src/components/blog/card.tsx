import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ title, subtitle, btnLabel, href }: any) => (
  <div className="text-center">
    <Link href={href}>
      <Image
        className="block mx-auto mb-4"
        width={600}
        height={400}
        src={""}
        alt="hello"
      />
    </Link>
    <div className="font-semibold text-center text-xl mb-1">{title}</div>
    <div className="text-md text-center mb-4">{subtitle}</div>
  </div>
);
export default BlogCard;
