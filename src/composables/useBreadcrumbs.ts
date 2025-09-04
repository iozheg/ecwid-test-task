const homeItem = {
  title: 'Home',
  disabled: false,
  href: '/',
};
const breadcrumbs = ref([homeItem]);

export const useBreadcrumbs = () => {
  function setBreadcrumbs(
    newBreadcrumbs: Array<{ title: string; href: string }>
  ) {
    breadcrumbs.value = [homeItem];
    breadcrumbs.value.push(
      ...newBreadcrumbs.map((bc, index) => ({
        ...bc,
        disabled: index === newBreadcrumbs.length - 1,
      }))
    );
  }
  return {
    breadcrumbs,
    setBreadcrumbs,
  };
};
