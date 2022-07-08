import clsx from 'clsx';

interface ParenProps {
  text: string;
  className?: string;
}

export const Parenthetical: React.FC<ParenProps> = ({ text, className }) => {
  return (
    <>
      {' '}
      <span
        className={clsx('text-sm font-light text-color-secondary', className)}
      >
        ({text})
      </span>
    </>
  );
};
