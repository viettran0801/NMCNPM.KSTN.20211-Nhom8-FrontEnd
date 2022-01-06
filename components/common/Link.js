import CustomLink from "next/link";

export default function Link(props) {
  const { href, children, ...rest } = props;
  return (
    <CustomLink href={href}>
      <a {...rest}>{children}</a>
    </CustomLink>
  );
}
