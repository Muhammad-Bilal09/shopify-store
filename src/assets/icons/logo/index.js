import Image from "next/image";

const Logo = ({ className = "" }) => {
  return (
    <Image
      src="/images/logo.png"
      alt="GreenOrganic Logo"
      width={90}
      height={90}
      className={`logo-image ${className}`}
      priority
    />
  );
};

export default Logo;
