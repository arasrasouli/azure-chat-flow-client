const pageData = {
  title: 'Dashboard',
  description: 'Welcome to your dashboard ...',
};

const getWelcomeMessage = function() {
  return pageData.description;
};

export { getWelcomeMessage, pageData };