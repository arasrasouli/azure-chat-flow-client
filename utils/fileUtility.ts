const ifFileTypeIsTxt = (file: File | null): boolean => {
    if (!file) return false;
    return file.type === 'text/plain';
  };

export { ifFileTypeIsTxt };
