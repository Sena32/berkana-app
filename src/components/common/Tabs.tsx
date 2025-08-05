'use client';

import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: number;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab = 0 }) => {
  const [active, setActive] = useState(defaultTab);

  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-border overflow-x-auto pb-1 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t transition-colors ${
              active === idx
                ? 'text-primary border-b-2 border-primary '
                : 'text-text-secondary hover:text-primary'
            }`}
            onClick={() => setActive(idx)}
            aria-selected={active === idx}
            aria-controls={`tab-panel-${idx}`}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id={`tab-panel-${active}`} role="tabpanel" className="w-full">
        {tabs[active].content}
      </div>
    </div>
  );
};

export default Tabs; 