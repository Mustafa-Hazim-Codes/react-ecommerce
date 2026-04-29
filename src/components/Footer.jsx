import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Shop. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
