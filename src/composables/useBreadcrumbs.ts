const homeItem = {
  title: 'Home',
  disabled: false,
  href: '/',
};
const breadcrumbs = ref<
  Array<{ title: string; href: string; disabled: boolean }>
>([]);

export const useBreadcrumbs = () => {
  function setBreadcrumbs(
    newBreadcrumbs: Array<{ title: string; href: string }>
  ) {
    breadcrumbs.value = [];
    breadcrumbs.value.push(
      ...newBreadcrumbs.map((bc, index) => ({
        ...bc,
        disabled: index === newBreadcrumbs.length - 1,
      }))
    );
    breadcrumbs.value.length > 0 && breadcrumbs.value.unshift(homeItem);
  }
  return {
    breadcrumbs,
    setBreadcrumbs,
  };
};
