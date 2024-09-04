const Footer = () => {
  const date = new Date();
  return (
    <div className="Footer">
      <p>Copyright &copy; {date.getFullYear()}</p>
    </div>
  );
};

export default Footer;
