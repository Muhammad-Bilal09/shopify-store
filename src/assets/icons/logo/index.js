import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/images/logo.png"
      alt="GreenOrganic Logo"
      width={100}
      height={100}
      style={{
        marginRight: "10px",
        marginLeft: "20px",
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
      }}
      priority
    />
  );
};

export default Logo;
