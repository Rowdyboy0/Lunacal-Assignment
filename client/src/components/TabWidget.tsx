import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useClickSound } from '@/hooks/useClickSound';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabWidgetProps {
  tabs: Tab[];
}

export default function TabWidget({ tabs }: TabWidgetProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  const playClick = useClickSound();

  const handleTabClick = (tabId: string) => {
    playClick();
    setActiveTab(tabId);
  };

  return (
    <Card className="w-full rounded-[20px] shadow-xl">
      <div className="p-6">
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              data-testid={`button-tab-${tab.id}`}
              className={`px-6 py-3 text-base font-medium transition-all duration-300 rounded-[18px] ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[200px] max-h-[280px] overflow-y-auto pr-2 scrollbar-custom">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`transition-opacity duration-200 ${
                activeTab === tab.id ? 'opacity-100' : 'opacity-0 hidden'
              }`}
              data-testid={`content-tab-${tab.id}`}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
