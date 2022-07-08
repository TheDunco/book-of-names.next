import type { TabProps } from './tab';
import { Tab } from './tab';

export interface TabsProps {
  tabs: TabProps[];
}

export const Tabs: React.FC<TabsProps> = (...props) => {
  return (
    <>
      {props[0].tabs.map((tab) => (
        <Tab
          href={tab.href}
          className={tab?.className}
          label={tab.label}
          key={tab.label}
        />
      ))}
    </>
  );
};
