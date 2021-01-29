export default function loadStyle(src: string) {
  return new Promise((resolve, reject) => {
    const linkId = `stylesheet_${src}`;
    const linkEl = document.getElementById(linkId);

    if (!linkEl) {
      const link = document.createElement('link');
      link.id = linkId;
      link.href = src;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Style load error for ${src}`));
      document.body.appendChild(link);
    } else {
      resolve();
    }
  });
}
