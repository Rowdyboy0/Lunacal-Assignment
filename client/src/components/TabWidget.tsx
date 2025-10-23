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
    <Card className="w-full">
      <div className="p-6">
        <div className="flex space-x-6 border-b border-border mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              data-testid={`button-tab-${tab.id}`}
              className={`pb-3 text-sm font-medium transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-secondary-foreground'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300"
                  style={{
                    boxShadow: '0 0 8px hsl(var(--primary))',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[200px]">
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
