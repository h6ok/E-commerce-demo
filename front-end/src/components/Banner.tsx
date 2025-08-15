type BannerProps = {
  path: string;
  alt: string;
};

export default function Banner({ path, alt }: BannerProps) {
  return (
    <div className="size-full">
      <img src={path} alt={alt} />
    </div>
  );
}
