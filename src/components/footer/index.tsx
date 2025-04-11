import { footerLinks, socialLinks } from "@/constants/constants";
import Logo from "../../assets/icons/logo";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <h6>
              <Logo /> <span>E</span>-Shop
            </h6>
            <p>
              House My Brand designs clothing for the young, the old & everyone
              in between – but most importantly, for the fashionable
            </p>
            <ul className="site-footer__social-networks">
              {socialLinks?.map((link, index) => (
                <li key={index}>
                  <a href="#">
                    <i className={link.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__links">
            {footerLinks?.map((section, index) => (
              <ul key={index}>
                <li>{section.title}</li>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>
            DESIGN BY Muhammad-Bilal - © {new Date().getFullYear()}. ALL RIGHTS
            RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
