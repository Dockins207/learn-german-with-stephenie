const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className="text-right p-4 text-xs text-gray-500">
      Copyright &copy; {year} Learn German with Stephenie. All rights reserved.
    </div>
  );
};

export default Copyright;
