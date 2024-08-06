type MyPrimaryButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: string;
};

function MyPrimaryButton({ children, className, type }: MyPrimaryButtonProps) {
  return (
    <button
      className={
        'py-1 px-4 bg-blue-500 rounded-lg duration-150 text-white hover:bg-blue-600 ' + className
      }
      type={type ? 'submit' : 'button'}>
      {children}
    </button>
  );
}

export default MyPrimaryButton;
