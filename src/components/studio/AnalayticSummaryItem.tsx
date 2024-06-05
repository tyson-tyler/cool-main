"use client";

interface AnalayticSummaryItemProps {
  value?: string | number;
  subtitle?: string | number;
}
const AnalayticSummaryItem: React.FC<AnalayticSummaryItemProps> = ({
  value,
  subtitle,
}) => {
  return (
    <div className="w-full flex flex-col flex-wrap justify-between p-2 sm:p-2 md:p-3 lg:p-4 rounde  mr-4 rounded-md sm:text-sm md:text-md lg:text-md">
      <h1 className="lg:text-2xl text-sm sm:text-sm md:text-md text-center mb-1">
        {value}
      </h1>
      <p className="font-medium text-gray-500 text-md lg:text-xl break-words">
        {subtitle}
      </p>
    </div>
  );
};

export default AnalayticSummaryItem;
