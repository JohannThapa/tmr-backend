export const transformDate = (value: string | any | null): Date => {
  if (!value) return null;
  try {
    return new Date(value);
  } catch (_) {
    return null;
  }
};
