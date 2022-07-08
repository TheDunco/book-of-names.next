import cn from 'classnames';
import type { Dispatch, SetStateAction } from 'react';

import { capitalizeFirstLetter } from '@/lib/capitalizeFirstLetter';
import type { ThemesEnum } from '@/templates/Main';

export interface ThemeButtonProps {
  className?: string;
  theme: ThemesEnum;
  themeSet: (val: ThemesEnum | ((prevState: ThemesEnum) => ThemesEnum)) => void;
  fontSet: Dispatch<SetStateAction<string>>;
  font: string;
}

export const ThemeButtonStyles =
  'bg-color-bg text-color-text rounded-lg px-2 py-1 border-color-primary hover:bg-color-secondary hover:text-color-special w-full max-w-lg';

export const ThemeButton: React.FC<ThemeButtonProps> = ({
  className,
  theme,
  themeSet,
  font,
  fontSet,
}) => {
  return (
    <button
      data-theme={theme}
      className={cn(className, ThemeButtonStyles, font, 'font-theme-font')}
      onClick={() => {
        themeSet(theme);
        fontSet(font);
      }}
    >
      {capitalizeFirstLetter(theme)}
    </button>
  );
};
