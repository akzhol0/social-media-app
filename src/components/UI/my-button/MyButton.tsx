type MyButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: string;
}

function MyButton({ children, className, type }: MyButtonProps) {
  return (
    <button
      className={'py-1 px-4 bg-red-500 rounded-lg duration-150 text-white hover:bg-red-600 ' + className}
      type={type ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

export default MyButton;