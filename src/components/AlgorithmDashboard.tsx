import React, { Children } from "react";

interface Props {
  children: React.ReactNode
}

export default function AlgorithmDashboard({ children }: Props) {
  const childrenArray = Children.toArray(children);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6 flex flex-col gap-4">
      { childrenArray.map((child, index) => (
        <React.Fragment key={ index }>
          { child }
          { index < childrenArray.length - 1 && (
            <div className="h-px bg-gray-200" />
          ) }
        </React.Fragment>
      )) }
    </div>
  );
}
