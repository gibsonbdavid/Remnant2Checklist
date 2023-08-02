function getUgradeable(htmlContent) {
  const regex = /upgrade/i;
  return regex.test(htmlContent);
}
