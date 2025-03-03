export default function ShortenedURL({ url }: { url: string }) {
  window.location.href = url;
  return (
    <div>
      Redirecting... if doesnt work, click <a href={url}>here</a>
    </div>
  );
}
