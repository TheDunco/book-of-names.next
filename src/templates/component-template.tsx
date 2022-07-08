import cn from 'classnames';

export interface TemplateProps {
  className?: string;
}

export const templateStyles = '';

export const Template: React.FC<TemplateProps> = ({ className }) => {
  return <div className={cn(className, templateStyles, '')}></div>;
};
