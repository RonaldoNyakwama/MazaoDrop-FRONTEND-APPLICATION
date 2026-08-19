export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phoneRe =
  /^(\+2547|07|2547)\d{8}$|^(\+2541|01|2541)\d{8}$/;

export const strongPw = (pw) =>
  pw.length >= 8 && /[a-zA-Z]/.test(pw) && /\d/.test(pw);

export function fieldCls(hasErr) {
  return `w-full py-3 bg-muted/50 border rounded-xl text-sm outline-none transition-colors ${
    hasErr
      ? "border-red-400 focus:border-red-500"
      : "border-border focus:border-primary"
  }`;
};