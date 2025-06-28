import { footerHeight } from "../../../helpers/config";

const Footer = () => {
  return (
    <footer
      className="bg-background p-5 pr-20 text-typography"
      style={{ height: footerHeight }}
    >
      {/* <p className="text-primary">Author: Mohansagar K</p>
      <p className="text-primary">
        <a href="mailto:contact@devmohan.in">contact@devmohan.in</a>
      </p> */}
    </footer>
  );
};

export default Footer;
