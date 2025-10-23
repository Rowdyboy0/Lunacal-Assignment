import TabWidget from '../TabWidget';

export default function TabWidgetExample() {
  const tabs = [
    {
      id: 'about',
      label: 'About Me',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Content for About Me will be added here.
          </p>
        </div>
      ),
    },
    {
      id: 'experiences',
      label: 'Experiences',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Content for Experiences will be added here.
          </p>
        </div>
      ),
    },
    {
      id: 'recommended',
      label: 'Recommended',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Content for Recommended will be added here.
          </p>
        </div>
      ),
    },
  ];

  return <TabWidget tabs={tabs} />;
}
