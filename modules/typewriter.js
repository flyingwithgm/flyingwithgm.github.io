export function initTypewriter() {
  document.querySelectorAll('.typewriter').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
  });
}
